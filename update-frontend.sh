#!/bin/bash
cd frontend
npm run build
scp -P 2232 -r dist/* rashmimetalik@111.118.189.60:~/public_html/
echo "Frontend updated successfully!"
