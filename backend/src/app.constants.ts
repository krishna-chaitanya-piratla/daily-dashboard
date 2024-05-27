import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { ConfigService } from "@nestjs/config";

export const environment = (configService: ConfigService): string => {
    const env = configService.get<string>('NODE_ENV');
    return env
}

// Get Environment Variables
export const envVars = (configService: ConfigService) => {
    const env = environment(configService);
    const client_url = env === 'prod' ? 'CLIENT_URL_PROD' : 'CLIENT_URL_LOCAL';
    const client_port = env === 'prod' ? 'CLIENT_PORT_PROD' : 'CLIENT_PORT_LOCAL';
    const server_url = env === 'prod' ? 'SERVER_URL_PROD' : 'SERVER_URL_LOCAL';
    const server_port = env === 'prod' ? 'SERVER_PORT_PROD' : 'SERVER_PORT_LOCAL';

    return {
        client_url: configService.get<string>(`${client_url}`), 
        client_port: configService.get<number>(`${client_port}`), 
        server_url: configService.get<string>(`${server_url}`), 
        server_port: configService.get<number>(`${server_port}`),
    }
}


// Confirmation Message upon Successful Server Start
export function appStartMessage(configService: ConfigService) {
    const { server_url, server_port } = envVars(configService);
    console.log(`This application is running on: ${server_url}:${server_port}`);
}

export const defaultCorsOptionsFactory = (configService: ConfigService): CorsOptions => ({
    origin: (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        const allowedOrigin = `${envVars(configService).client_url}:${envVars(configService).client_port}`;
    
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!requestOrigin) {
        callback(null, true);
        return;
        }
    
        const allow = requestOrigin === allowedOrigin;
        const error = allow ? null : new Error(`Origin '${requestOrigin}' not allowed by CORS`);
        callback(error, allow);
    },
    
    // origin: `${envVars(configService).client_url}:${envVars(configService).client_port}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true, // If you need to allow cookies or authorization headers
    });