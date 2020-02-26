# Blackout PDF Demo

## Requirements
* Node.js
* NGROK/TunnelNow
* Dashboard Access
* Sample PDF


## Run App
```
npm install
```
```
node app.js
```

## Run Ngrok

./ngrok http 3000

## VGS Dashboard Route Config

- specify the Inbound/Outbound Route -> Destination URL/Upstream Host (e.g. `https://83c98ac2.ngrok.io`)
- specify the PathInfo begins_with (e.g. `/redact`)
- specify the ContentType equals (e.g. `application/pdf`)
- select phase `On response` for GET request, `On request` for POST
- choose `Basic > PDF metadata`
- redaction starts from the bottom left of the file
- choose an area on the PDF to redact
- configure Coordinates like `0, 0, 100, 100:*` the first two numbers are from the left bottom and the last two are the dimensions of the blackout box.

## Run Curl 
```bash
curl https://tntebi6bybo.SANDBOX.verygoodproxy.com/redact \
    -H "Content-type: application/pdf" \
    --data-binary '@sample.pdf'
```
```bash
curl -X GET 'https://a44fb068.ngrok.io/redacted' -k \
    -x $HTTPS_PROXY_USERNAME:$HTTPS_PROXY_PASSWORD@tntebi6bybo.sandbox.verygoodproxy.com:8080 \
    -H "Content-type: application/pdf" \
    -o sample-revealed.pdf
```

## Demo 

 ![nodeappdemo](node-app-demo.gif "node demo")


## Host PDF using Python Simple HTTP Server

You can also test reveal/redact while simply hosting PDF via python simple http server and ngrok.

```bash
python -m SimpleHTTPServer 8000 # Or use Python 3 with python3 -m http.server 8000
ngrok http 8000
```
Run Test:
```
curl -X GET 'https://3eaac825.ngrok.io/redacted.pdf' -k \
-x $HTTPS_PROXY_USERNAME:$HTTPS_PROXY_PASSWORD@tntk5u0xlui.SANDBOX.verygoodproxy.com:8080 \
-H "Content-type: application/pdf" \
-o revealed.pdf
```
You can also use a code script:
```
import requests

url='https://d9bc7892.ngrok.io/redacted.pdf'
headers = {'Content-type': 'Application/pdf'}
r = requests.get(url,
        headers=headers,
        proxies={"https" : "https://<HTTPS_PROXY_USERNAME>:<HTTPS_PROXY_PASSWORD>@tntk5u0xlui.SANDBOX.verygoodproxy.com:8080"},
        verify=False)


with open('pdf-sample-revealed.pdf', 'wb') as f:
    f.write(r.content)
```

 ![unmaskpdf](unmask-pdf.gif "unmask pdf")



