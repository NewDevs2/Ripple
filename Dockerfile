# Base image
FROM node:18.16.0

# Install Android SDK
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openjdk-11-jdk \
    wget \
    unzip && \
    rm -rf /var/lib/apt/lists/*

ENV ANDROID_HOME=/opt/android-sdk-linux
ENV PATH=${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator

# Download and install Android SDK
RUN wget -O /tmp/sdk-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip && \
    unzip /tmp/sdk-tools.zip -d $ANDROID_HOME/cmdline-tools && \
    rm /tmp/sdk-tools.zip && \
    yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --sdk_root=$ANDROID_HOME "platform-tools" "emulator"

# Set up emulator
RUN echo 'no' | $ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd -n emulator -k "system-images;android-30;google_apis;x86_64" -f

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy source code
COPY . .

# Expose ports
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
