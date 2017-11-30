Kibana Backend
==============


This is a component of the Waziup platform.
It's role is to authenticate the users accessing Kibana.
Furthermore it provides access control on the resources provided to Kibana.

Usage
-----

The Kibana backend need to be started together with other Waziup components:
```
git clone git@github.com:Waziup/Platform.git
cd Platform
docker-compose pull elasticsearch kibana keycloak kibana-backend
docker-compose up elasticsearch kibana keycloak kibana-backend
```

Then go to http://localhost:6565/kibana/app/kibana
It should redirect you to the Waziup login page.
After identifying you can access Kibana.
