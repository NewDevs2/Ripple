import React, { useState, useEffect } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import UserIcon from "./userIcon";
import MyIcon from "./myLocationIcon";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://172.30.1.41:3000";

// 두 지점 사이의 거리를 계산하는 함수
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // 지구 반지름 (단위 : km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 두 지점 사이의 거리 (단위: km)
  return distance;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

// 두 지점 사이의 거리가 일정 거리 이하인지 확인하는 함수

const distanceChecker = (distance: number | null): boolean => {
  return distance !== null && distance <= 3;
};

const Geolocation: React.FC = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [userIcons, setUserIcons] = useState<
    { userId: string; location: string; position: { x: number; y: number } }[]
  >([]);

  // UserIcon의 무작위 x와 y 좌표를 생성.
  const generateRandomPosition = () => {
    const x = Math.random() * (window.innerWidth - 50); // 아이콘의 너비에 맞게 50을 조절
    const y = Math.random() * (window.innerHeight - 50); // 아이콘의 높이에 맞게 50을 조절
    return { x, y };
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    const getCurrentLocation = (): Promise<GeolocationPosition> =>
      new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation을 지원하지 않습니다."));
        }

        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      });

    const fetchLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        setUserLocation(`Latitude : ${latitude}, Longitude : ${longitude}`);
        const userLocationString = `Latitude : ${latitude}, Longitude : ${longitude}`;
        socket.emit("location", userLocationString);
      } catch (error) {
        setUserLocation("위치를 가져올 수 없습니다.");
        console.error("위치를 가져오는데 실패했습니다 : ", error);
      }
    };
    fetchLocation();

    socket.on("location", (data: string[]) => {
      const newUserIcons = data
        .filter((location) => location !== userLocation)
        .map((location) => ({
          userId: location, // 사용자 고유 식별자
          location,
          position: generateRandomPosition(),
        }));
      setUserIcons(newUserIcons);
    });

    const disconnectSocket = () => {
      socket.disconnect();
    };

    return disconnectSocket;
  }, []);

  useEffect(() => {
    if (userLocation && locations.length > 0) {
      const { latitude: myLat, longitude: myLon } = parseLocation(userLocation);
      const otherLocation = locations[0];
      const { latitude: otherLat, longitude: otherLon } =
        parseLocation(otherLocation);
      const distance = calculateDistance(myLat, myLon, otherLat, otherLon);
      setDistance(distance);
    }
  }, [userLocation, locations]);

  const parseLocation = (location: string) => {
    const [latStr, lonStr] = location.split(", ");
    const latitude = parseFloat(latStr.split(":")[1].trim());
    const longitude = parseFloat(lonStr.split(":")[1].trim());
    return { latitude, longitude };
  };

  return (
    <>
      <Box className="App">
        <Box
          className="container"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          width={"100vw"}
          height={"100vh"}
        >
          {userLocation ? (
            <MyIcon /> // 현재 사용자의 위치에 MyIcon을 표시
          ) : (
            <Text>위치를 불러오는 중입니다...</Text>
          )}
          {/* 다른 사용자의 위치에 UserIcon을 표시 */}
          {userIcons.map((userIcon) => (
            <UserIcon
              key={userIcon.userId}
              location={userIcon.location}
              position={userIcon.position}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Geolocation;
