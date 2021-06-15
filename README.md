# IEI.Adept.SmokeTests

End-to-end smoketests for Adept using Nightwatch.  The purpose of this project
is to walk some common link paths in Adept in order to trigger errors that may
have resulted from other deployed code.

Errors can be monitored on [Kibana](https://kibana/) and performance monitored
via [Prometheus](http://prometheus.gainesville.infiniteenergy.com)

## Setup

Run `yarn install` to install required dependencies.

## Running Tests

Run `yarn run test` to run smoke test suite.

