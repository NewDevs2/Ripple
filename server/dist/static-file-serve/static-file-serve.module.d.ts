import { NestModule, MiddlewareConsumer } from '@nestjs/common';
export declare class StaticFileServeModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
