# Proxy for Tiles from Google Earth Engine
tiles.croplands.org

code recovered from gfsad-tile2-d.wr.usgs.gov
where it was running as:
```
gunicorn tiles:app -b :8000 --workers=2 -k gevent -t 45 --log-level=DEBUG
```

The following environment variables are required for the app to run:
```
DG_EV_CONNECT_ID
DG_EV_PASSWORD
DG_EV_USERNAME
GOOGLE_SERVICE_ACCOUNT_ENC
GS_ACCESS_KEY
GS_SECRET
POSTMARK_API_KEY
REDIS_URL
SECRET
SERVER_ADDRESS
SQLALCHEMY_DATABASE_URI
SSL_CERT_FILE
```
