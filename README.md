# Prototypes

Simple prototypes server running on a k8s pod.

This repository holds the source code for:
- 1-n prototype applications (one per sub directory).
- an nginx reverse proxy to route traffic around the box.

Prototypes exist in multiple environments. Succesful merges to this repo (by which I mean a change that results in a successful build) are automatically deployed to: https://prototypes.staging.ukstats.dev/ ... followed by the path you define in the nginx conf (see "Adding a new application").

For example: https://prototypes.staging.ukstats.dev/sanity-check

Anything with a release tag is deployed to https://prototypes.production.ukstats.dev

https://prototypes.sandbox.ukstats.dev is syncronised to staging but other commits or branches can be specified ad-hoc via the cloud build job `sandbox-prototypes-latest` (GCP console -> cloud build -> triggers -> europe-west2 -> find right pipeline -> click RUN -> select your options). Please note - this is _ephemeral_ and new commits to staging will overwrite such a deployment.

The intention of the above described sandbox behaviour is to enable temporary deployments to try out new or large application changes "live" rather than to enable any sort of permenant deployment.


## The Rules

- It's one box, don't put anything too resource intensive on here please.
- All applications must run **on a unique port**.
- Be a good citizen add any new prototypes to `./index.html`.


## Adding a new application

- Create your prototype in its own directory (such as `./data-catalogue` or `./sanity-check`)
- You **must** include a `./robots.txt` endpoint to stop the prototype getting indexed. The response from this endpoint should be:
```
User-agent: *
Disallow: /
```
with a status code `200` and with a mimetype of `mimetype='text/plain'`.
- Copy your application in to the image via the dockerfile. There is a python and a yarn example included as "Application 1" and "Application 2" respectivly.
- Update the `CMD` instruction with however your app starts, just follow the existing patterns.
- Add a new location block to `nginx.conf` as per the following. The **only** thing that should change is the `<PATH>` and the `<PORT>`.

```
    location /<PATH> {
        proxy_pass http://localhost:<PORT>/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
```

There should be multiple examples to draw from within the conf already.

## Trying it out locally

Always worth doing this before you push, just to make sure your prototype will work on the web.

- ` docker build .` from this root directory.
- This should end in a big sha value.
- `docker run -p 80:80 <BIG SHA VALUE>`

You should be able to get your app at `localhost:80/<whatever-path-you-defined-in-nginx-conf>`

When you need to stop the container then:
- open a new terminal tab/window.
- run `docker ps` and get the id (first column)
- run `docker kill <ID>`.

## Other dependencies

We can probably run using dependencies beyond python3 and Yarn/NPM but you'll need to add them to the [Dockerfile](./Dockerfile) and make sure it (and the existing prototypes) works.