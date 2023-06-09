FROM nginx:latest

# -------------------
# Adding Dependencies
# -------------------

# Install Python 3 and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js, Yarn, sass and next
# NOTE - installing into /npm as there's issues installing
# into root
WORKDIR /npm
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y nodejs yarn && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /
ENV PATH="/npm/node_modules/.bin:${PATH}"

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
COPY ./data-catalogue ./npm/data-catalogue
WORKDIR /npm/data-catalogue
RUN yarn install

# -------------------
# Nginx configuration
# -------------------
# leave this alone please
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
EXPOSE 80

# ∑---------------
# Starting things
# ---------------

# Add your app start command as per the examples below
CMD \
    cd /npm/data-catalogue && yarn dev & \
    cd /sanity-check && python3 app.py & \
    nginx -g "daemon off;"
