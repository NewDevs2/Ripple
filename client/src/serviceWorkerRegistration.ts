// 이 선택 코드는 서비스 작업자를 등록하는 데 사용됩니다.
// register()는 기본적으로 호출되지 않습니다.

// 이를 통해 운영 중인 다음 방문 시 앱을 더 빠르게 로드할 수 있으며 오프라인 기능을 제공합니다.
// 그러나 이전에 캐시된 리소스가 백그라운드에서 업데이트되므로 페이지에 열려 있는 기존 탭이 모두 닫힌 후
// 개발자(및 사용자)는 페이지를 방문할 때 배포된 업데이트만 볼 수 있습니다.

// 이 모델의 이점과 선택 방법에 대한 지침에 대한 자세한 내용은 https://cra.link/PWA를 참조하세요.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1]은(는) IPv6 로컬 호스트 주소입니다.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 주소는 IPv4의 로컬 호스트로 간주됩니다.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // URL 생성자는 소프트웨어를 지원하는 모든 브라우저에서 사용할 수 있습니다.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // PUBLIC_URL이 우리 페이지에서 제공되는 것과 다른 출처에 있는 경우 서비스 직원이 작동하지 않습니다.
      // CDN이 자산을 제공하는 데 사용되는 경우 이 문제가 발생할 수 있습니다.
      // https://github.com/facebook/create-react-app/issues/2374 을 참조하세요.
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // 로컬 호스트에서 실행 중인지 확인합니다. 서비스 워커가 존재하는지 확인합니다.
        checkValidServiceWorker(swUrl, config);
        // localhost에 추가 로깅을 추가하여 개발자가 서비스 작업자/PWA 문서를 참조하도록 합니다.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit https://cra.link/PWA"
          );
        });
      } else {
        // 로컬 호스트 환경이 아니라면, 바로 서비스 워커를 등록합니다.
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // 이 시점에서 업데이트된 미리 캐시된 콘텐츠를 가져오지만
              // 모든 클라이언트 탭이 닫힐 때까지
              // 이전 서비스 작업자가 이전 콘텐츠를 계속 제공합니다.
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed. See https://cra.link/PWA."
              );

              // 콜백 실행
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // 이 시점에서, 모든 것이 프리캐시됩니다.
              console.log("Content is cached for offline use.");

              // 콜백 실행
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // 페이지를 다시 로드할 수 없는 경우, 서비스 워커를 찾을 수 있는지 확인합니다.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      // 서비스 워커가 존재하고 JS 파일을 실제로 받고 있는지 확인합니다.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // 서비스 작업자를 찾을 수 없는 경우(아마 다른 앱일 경우), 페이지를 다시 로드합니다.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // 서비스 워커를 찾았을 경우, 다시 정상적으로 진행합니다.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
