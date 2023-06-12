# Base image
FROM node:18.16.0

# Install Android SDK
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openjdk-11-jdk \
    unzip && \
    rm -rf /var/lib/apt/lists/*

ENV ANDROID_SDK_ROOT=/opt/android-sdk-linux
ENV PATH="${ANDROID_SDK_ROOT}/emulator:${ANDROID_SDK_ROOT}/tools:${ANDROID_SDK_ROOT}/tools/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}"

RUN wget https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip -O /tmp/sdk-tools-linux.zip && \
    mkdir -p ${ANDROID_SDK_ROOT} && \
    unzip /tmp/sdk-tools-linux.zip -d ${ANDROID_SDK_ROOT} && \
    rm /tmp/sdk-tools-linux.zip && \
    echo y | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} "platform-tools" "emulator"

# Set up emulator
RUN echo 'no' | avdmanager create avd -n emulator -k "system-images;android-30;google_apis;x86_64" -f

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
