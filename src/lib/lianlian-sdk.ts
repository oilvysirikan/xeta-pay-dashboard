interface LLPayConfig {
  productionEnv: boolean;
  merchantPrivateKey: string;
  lianLianPublicKey: string;
}

interface LLPayRequest {
  httpMethod: () => 'POST' | 'GET';
  [key: string]: any;
}

interface LLPayResponse {
  code: number;
  message: string;
  data?: any;
  sign_verify?: boolean;
}

class SignUtil {
  private objectToArray(obj: any): any {
    const arr = typeof obj === 'object' && obj !== null ? { ...obj } : obj;
    const result: any = {};
    for (const key in arr) {
      if (arr.hasOwnProperty(key)) {
        const val = arr[key];
        result[key] = typeof val === 'object' && val !== null ? this.objectToArray(val) : val;
      }
    }
    return result;
  }

  private genSignContent(req: any): string {
    const arr = [req];
    const strs: string[] = [];
    // PHP SDK uses ksort on the array
    const keys = Object.keys(arr).sort();
    const sortedArr: any = {};
    for (const key of keys) {
      sortedArr[key] = arr[Number(key)];
    }
    console.error("🔐 REQUEST TO SIGN:", JSON.stringify(sortedArr, null, 2));
    console.error("🔐 STARTING ITEMS TRAVERSAL");
    this.items(0, sortedArr, strs);
    console.error("🔐 STRS ARRAY:", JSON.stringify(strs, null, 2));
    const msg = strs.join('&');
    console.error("🔐 SIGN CONTENT:", msg);
    console.error("🔐 SIGN LENGTH:", msg.length);
    return msg;
  }

  private sortArray(arr: any[]): void {
    if (Array.isArray(arr)) {
      // PHP's ksort sorts by keys, not values
      // For arrays with numeric indices, this is equivalent to sorting by index
      // But we need to ensure the order is consistent
      const keys = Object.keys(arr).sort();
      const sorted: any = {};
      for (const key of keys) {
        sorted[key] = arr[Number(key)];
      }
      // Copy back to original array
      Object.assign(arr, sorted);
      
      // Recursively sort nested objects/arrays
      for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
          if (typeof arr[key] === 'object' && arr[key] !== null) {
            if (Array.isArray(arr[key])) {
              this.sortArray(arr[key]);
            } else {
              this.sortObject(arr[key]);
            }
          }
        }
      }
    }
  }

  private sortObject(obj: any): void {
    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
      const keys = Object.keys(obj).sort();
      const sorted: any = {};
      for (const key of keys) {
        sorted[key] = obj[key];
      }
      Object.assign(obj, sorted);
    }
  }

  private items(key: any, value: any, strs: string[]): void {
    if (value === null || value === undefined) {
      return;
    }
    // PHP's is_array returns true for both arrays and objects in associative context
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        this.sortArray(value);
      } else {
        this.sortObject(value);
      }
      // Iterate through all keys sorted like PHP ksort
      Object.keys(value).sort().forEach(k => {
        if (value[k] !== null && value[k] !== undefined) {
          this.items(k, value[k], strs);
        }
      });
      return;
    }
    if (typeof value === 'function') {
      return;
    }
    strs.push(`${key}=${value}`);
  }

  private formatPemKey(key: string, type: 'PRIVATE' | 'PUBLIC'): string {
    const cleanKey = key.replace(/-----BEGIN RSA PRIVATE KEY-----/g, '')
                        .replace(/-----END RSA PRIVATE KEY-----/g, '')
                        .replace(/-----BEGIN PRIVATE KEY-----/g, '')
                        .replace(/-----END PRIVATE KEY-----/g, '')
                        .replace(/-----BEGIN PUBLIC KEY-----/g, '')
                        .replace(/-----END PUBLIC KEY-----/g, '')
                        .replace(/\s+/g, '');
    
    const lines = cleanKey.match(/.{1,64}/g) || [];
    const keyType = type === 'PRIVATE' ? 'RSA PRIVATE KEY' : 'PUBLIC KEY';
    return `-----BEGIN ${keyType}-----\n${lines.join('\n')}\n-----END ${keyType}-----`;
  }

  async genSign(toSign: string, privateKey: string): Promise<string> {
    const cleanKey = privateKey.replace(/-----BEGIN RSA PRIVATE KEY-----/g, '')
                        .replace(/-----END RSA PRIVATE KEY-----/g, '')
                        .replace(/-----BEGIN PRIVATE KEY-----/g, '')
                        .replace(/-----END PRIVATE KEY-----/g, '')
                        .replace(/\s+/g, '');
    
    const formattedKey = "-----BEGIN RSA PRIVATE KEY-----\n" + 
                         cleanKey.match(/.{1,64}/g)?.join('\n') + 
                         "\n-----END RSA PRIVATE KEY-----";
    
    const encoder = new TextEncoder();
    const pemContents = formattedKey
      .replace(/-----BEGIN RSA PRIVATE KEY-----/g, '')
      .replace(/-----END RSA PRIVATE KEY-----/g, '')
      .replace(/\s/g, '');
    
    const binaryString = atob(pemContents);
    const binaryKey = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      binaryKey[i] = binaryString.charCodeAt(i);
    }
    
    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      binaryKey.buffer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-1' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      encoder.encode(toSign)
    );

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  }

  async verifySign(data: string, sign: string, pubKey: string): Promise<boolean> {
    const formattedKey = this.formatPemKey(pubKey, 'PUBLIC');
    const signature = Uint8Array.from(atob(sign), c => c.charCodeAt(0));
    
    const encoder = new TextEncoder();
    const binaryKey = Uint8Array.from(atob(formattedKey.replace(/-----BEGIN PUBLIC KEY-----/g, '').replace(/-----END PUBLIC KEY-----/g, '').replace(/\s/g, '')), c => c.charCodeAt(0));
    
    const cryptoKey = await crypto.subtle.importKey(
      'spki',
      binaryKey.buffer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-1' },
      false,
      ['verify']
    );

    return await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      signature,
      encoder.encode(data)
    );
  }

  async sign(data: any, privateKey: string): Promise<string> {
    const signContent = this.genSignContent(data);
    console.error("🔐 LianLian Sign String:", signContent);
    console.error("🔐 Private Key Length:", privateKey.length);
    return await this.genSign(signContent, privateKey);
  }

  async verify(data: any, sign: string, pubKey: string): Promise<boolean> {
    const signContent = this.genSignContent(data);
    return await this.verifySign(signContent, sign, pubKey);
  }
}

class LLPayClient {
  private config: LLPayConfig;
  private signUtil: SignUtil;
  private serverUrl: string;

  constructor(config: LLPayConfig) {
    this.config = config;
    this.signUtil = new SignUtil();
    this.serverUrl = config.productionEnv 
      ? 'https://api.lianlianpay.co.th/gateway' 
      : 'https://sandbox-th.lianlianpay-inc.com/gateway';
  }

  async execute(payRequest: LLPayRequest): Promise<LLPayResponse> {
    const signContent = this.signUtil['genSignContent'](payRequest);
    const signature = await this.signUtil.sign(payRequest, this.config.merchantPrivateKey);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'sign_type': 'RSA',
      'sign': signature
    };
    console.log("📤 Sending request to:", this.serverUrl);
    console.log("📤 Request body:", JSON.stringify(payRequest, null, 2));
    console.log("📤 Headers:", JSON.stringify(headers, null, 2));
    let result: any;
    if (payRequest.httpMethod() === 'POST') {
      result = await this.post(this.serverUrl, headers, payRequest);
    } else {
      result = await this.get(`${this.serverUrl}?${signContent}`, headers);
    }
    const response = result.body;
    const headerResponse = result.headers;
    
    console.log("📥 Raw Response from LianLian:", JSON.stringify(response, null, 2));
    console.log("📥 Response Headers:", JSON.stringify(headerResponse, null, 2));

    const code = response.code;
    const message = response.message;

    if (code !== 200000 || message !== 'Success') {
      console.log("🔍 Adding debug info to error response");
      (response as any).debug_sign_content = signContent;
      (response as any).debug_signature = signature;
      (response as any).debug_request_body = payRequest;
      console.log("🔍 Response with debug:", JSON.stringify(response, null, 2));
      return response;
    }

    const lianLianSign = headerResponse['sign']?.[0];
    if (!lianLianSign) {
      console.error("❌ No signature in response headers");
      response.sign_verify = false;
      return response;
    }

    console.log("🔐 Verifying response signature...");
    const check = await this.signUtil.verify(response.data, lianLianSign, this.config.lianLianPublicKey);
    console.log("🔐 Signature valid:", check);
    
    if (!check) {
      console.error("❌ Invalid LianLian signature");
      throw new Error("Invalid signature from LianLian");
    }
    
    response.sign_verify = check;
    return response;
  }

  async executeWithRetry(payRequest: LLPayRequest, maxRetries: number = 3): Promise<LLPayResponse> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await this.execute(payRequest);
      } catch (err) {
        if (attempt === maxRetries - 1) {
          console.error("❌ Max retries reached");
          throw err;
        }
        console.warn(`⚠️ Retry attempt ${attempt + 1}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
    throw new Error("Max retries exceeded");
  }

  private async post(url: string, headers: Record<string, string>, body: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const responseHeaders: Record<string, string[]> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = [value];
    });

    return {
      body: await response.json(),
      headers: responseHeaders
    };
  }

  private async get(url: string, headers: Record<string, string>): Promise<any> {
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    const responseHeaders: Record<string, string[]> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = [value];
    });

    return {
      body: await response.json(),
      headers: responseHeaders
    };
  }
}

export { LLPayClient, SignUtil };
export type { LLPayConfig, LLPayRequest, LLPayResponse };
