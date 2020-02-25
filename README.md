# Blackout PDF Demo

## Requirements
* Ruby
* Python
* NGROK/TunnelNow
* Dashboard Access
* Sample PDF


## Ruby Echo Server
```
gem install bundle
```
```
bundle install
```

```
bundle exec ruby web.ru -p 4567
```

## Ngrok Config (or use TunnelNow)

./ngrok http localhost:4567

## Rule Config

See Screenshots - set rules based on your ngrok info.

- specify the Inbound/Outbound Route -> Destination URL/Upstream Host (e.g. `https://83c98ac2.ngrok.io`)
- specify the PathInfo begins_with (e.g. `/redact`)
- specify the ContentType equals (e.g. `application/pdf`)
- select phase `On response` for GET request, `On request` for POST
- choose `Basic > PDF metadata`
- redaction starts from the bottom left of the file
- choose an area on the PDF to redact
- configure Coordinates like `0, 0, 100, 100:*` the first two numbers are from the left bottom and the last two are the dimensions of the blackout box.

## Python Config 
Just change to your tenant information in the two python files (reverse and forward for reveal).

```
python3 pdf_demo.py //redacts
```

```
python3 pdf_demo_reveal.py //reveals
```

Each one creates a file first one called pdf-sample-redacted.pdf, second one called pdf-sample-revealed.pdf


## Host a PDF and test Reveal/Redact

You can also test reveal/redact while hosting PDF via python simple http server and ngrok (make sure you run in from the directory where redacted.pdf is. 

```bash
python -m SimpleHTTPServer 8000 # Or use Python 3 with python -m http.server 8000
ngrok http 8000
```
Run Test:
```
curl -X GET 'https://3eaac825.ngrok.io/redacted.pdf' -k \
-x $HTTPS_PROXY_USERNAME:$HTTPS_PROXY_PASSWORD@tntk5u0xlui..SANDBOX.verygoodproxy.com:8080 \
-H "Content-type: application/pdf" \
-o revealed.pdf
```




