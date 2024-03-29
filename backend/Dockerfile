FROM debian:bullseye

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 python3-pip curl && \
    apt-get clean

COPY ./requirements.txt ./
COPY ./requirements-fast.txt ./

RUN chown -R 1000:1000 /app

RUN pip install --no-cache-dir wheel

RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip3 install --no-cache-dir -r requirements-fast.txt

EXPOSE 8000

CMD ["python3", "-m", "app", "start"]