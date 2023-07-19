/// <reference lib="webworker" />
/* eslint 비활성화 */

// 이 서비스 워커는 직접 커스터마이징 할 수 있습니다.
// 다음을 확인해보세요 : https://developers.google.com/web/tools/workbox/modules
// 사용 가능한 Workbox 모듈 목록을 보거나 원하는 다른 코드를 추가합니다.
// 서비스 워커를 사용하지 않으려는 경우에 이 파일을 제거할 수 있습니다. 이렇게 되면 Workbox 빌드 단계를 건너뛰게 됩니다.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// 빌드 프로세스에서 생성된 모든 자산을 미리 캐시합니다.
// 해당 URL은 아래 매니페스트 변수에 삽입됩니다.
// 사전 캐싱을 사용하지 않기로 결정하더라도 이 변수는 서비스 작업자 파일의 어딘가에 있어야 합니다.
// 해당 링크를 확인해보세요 : https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// 모든 탐색 요청이 index.html 셸로 충족되도록 App Shell 스타일 라우팅을 설정합니다.
// 자세한 내용은 https://developers.google.com/web/fundamentals/architecture/app-shell 에서 확인하세요.
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // index.html로 요청이 충족되지 않도록 하려면 false를 반환합니다.
  ({ request, url }: { request: Request; url: URL }) => {
    // navigation이 아닌 경우 건너뜁니다.
    if (request.mode !== "navigate") {
      return false;
    }

    // /_로 시작하는 URL이면 건너뜁니다.
    if (url.pathname.startsWith("/_")) {
      return false;
    }

    // 파일 확장명이 포함되어 리소스의 URL처럼 보이는 경우 건너뜁니다.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // true를 반환하여 핸들러를 사용할 것임을 나타냅니다.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// precache에 의해 처리되지 않은 요청에 대한 런타임 캐싱 경로의 예(이 경우에는 public/에서 보낸 요청과 같은 동일한 출처의 .png 요청)
registerRoute(
  // 필요에 따라 다른 파일 확장명 또는 라우팅 기준을 추가합니다.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  // 필요에 따라 이 전략을 사용자 지정합니다(예: CacheFirst로 변경).
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      // 이 런타임 캐시가 최대 크기에 도달하면 가장 최근에 사용되지 않은 이미지가 제거됐는지 확인합니다.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// 아래 코드를 통해 웹 앱이 skipWaiting을 트리거할 수 있습니다
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// 다른 서비스 워커 로직은 다음과 같은 파일에서 커스텀할 수 있습니다.

// service-worker.js
