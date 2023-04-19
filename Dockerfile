FROM nginx:latest

# -------------------
# Adding Dependencies
# -------------------

# Install Python 3 and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js, Yarn and next
# NOTE - installing into /npm as there's issues installing
# into root. Npm/Yarn apps will need to go in there as well
WORKDIR /
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y nodejs yarn && \
    rm -rf /var/lib/apt/lists/*
#RUN npm i next@latest
WORKDIR /

# ---------------------------
# Application 1: sanity-check
# ---------------------------
COPY ./sanity-check ./sanity-check
WORKDIR /sanity-check
RUN pip install -r ./requirements.txt
WORKDIR /

# ------------------------------------
# Application 2: data-catalogue server
# ------------------------------------
COPY ./data-catalogue ./data-catalogue

# -------------------
# Nginx configuration
# -------------------
# leave this alone please
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80

# ∑---------------
# Starting things
# ---------------

# Add your app start command as per the examples below
CMD \
    cd /data-catalogue && yarn dev & \
    cd /sanity-check && python3 app.py & \
    nginx -g "daemon off;"
