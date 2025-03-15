/**
 * Configuration for image analyzer services
 */

export interface Config {
  /** API key for the image analysis service (e.g., OpenAI) */
  apiKey?: string;
  
  /** The model to use for analysis (e.g., "gpt-4o") */
  modelName: string;
  
  /** Maximum number of seconds to wait for a response */
  timeout: number;
}

/**
 * Default configuration values
 */
export const defaultConfig: Config = {
  modelName: "gpt-4o",
  timeout: 30,
};

/**
 * Creates a merged configuration with defaults and overrides
 */
export function createConfig(overrides: Partial<Config> = {}): Config {
  return {
    ...defaultConfig,
    ...overrides,
  };
}