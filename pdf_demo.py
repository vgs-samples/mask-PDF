import requests


Data = open('./pdf-sample.pdf', 'rb').read()
headers = {'Content-type': 'application/pdf'}
url='https://tntnijrbibm.SANDBOX.verygoodproxy.com/redact'
r = requests.post(url,data=Data, headers=headers)


with open('pdf-sample-redacted.pdf', 'wb') as f:
    f.write(r.content)




