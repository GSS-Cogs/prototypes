FROM python

# Install dependency
RUN pip install flask

# Copy in our simple python server code
COPY ${PWD}/temporary_app.py /temporary_app.py

# Run it
CMD ["python3", "/temporary_app.py"]