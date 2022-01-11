#!/bin/bash
yarn
yarn run typeorm migration:run
yarn run dev
