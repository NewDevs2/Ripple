import { Response } from 'express';
import { FallbackService } from './fallback.service';
export declare class FallbackController {
    private readonly FallbackService;
    constructor(FallbackService: FallbackService);
    failback(res: Response): void;
}
