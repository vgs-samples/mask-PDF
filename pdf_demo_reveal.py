import requests

Data = open('./pdf-sample-redacted.pdf', 'rb').read()

url='https://a0a89483.ngrok.io/reveal'
headers = {'Content-type': 'Application/pdf'}
r = requests.post(url,
        data=Data,
        headers=headers,
        proxies={"https" : "https://USfL2BLbEMdJQDXwzbtbvgCd:78a52b09-9d5d-4c78-8bc3-3630a04e21b4@tntnijrbibm.SANDBOX.verygoodproxy.com:8080"},
        verify=False)



with open('pdf-sample-revealed.pdf', 'wb') as f:
    f.write(r.content)
