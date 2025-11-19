# main.py
import functions_framework
from google.cloud import storage
import os
import mimetypes

# Get the bucket name from an environment variable
BUCKET_NAME = os.environ.get('GCS_BUCKET_NAME', 'your-default-bucket-name')
storage_client = storage.Client()

@functions_framework.http
def serve_file(request):
    """
    Serves a file from a GCS bucket.
    Defaults to serving index.html if no path is specified.
    """
    # Get the path from the request, default to index.html
    path = request.path.lstrip('/')
    if not path:
        path = 'index.html'

    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob(path)

    if not blob.exists():
        return 'File not found', 404

    try:
        content = blob.download_as_bytes()
        content_type, _ = mimetypes.guess_type(path)
        if content_type is None:
            content_type = 'application/octet-stream'
        
        headers = {
            'Content-Type': content_type
        }
        return (content, 200, headers)

    except Exception as e:
        return f'Error serving file: {e}', 500
