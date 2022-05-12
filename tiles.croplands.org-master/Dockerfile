FROM usgsastro/debian:10

ENV PIP_CERT /etc/ssl/certs/ca-certificates.crt
ENV REQUESTS_CA_BUNDLE /etc/ssl/certs/ca-certificates.crt

RUN apt-get update && apt-get install -y python-pip && rm -rf /var/cache/apt/* /var/lib/apt/lists/*

RUN useradd -m appuser

WORKDIR /home/appuser/app
COPY . .
RUN chown -R appuser:appuser .

USER appuser

ENV PATH "/home/appuser/.local/bin:$PATH"
RUN pip install --user -U pip setuptools && pip install --user -r requirements.txt

EXPOSE 8000
CMD gunicorn tiles:app -b :8000 --workers=2 -k gevent -t 45 --log-level=DEBUG
