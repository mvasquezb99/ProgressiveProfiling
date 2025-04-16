import * as ejs from 'ejs';

/**
 * Renders an EJS template from a file with typed data.
 * This version manually wraps the renderFile call with the correct arguments.
 */
export async function renderTemplate<T>(
  path: string,
  data: T,
): Promise<string> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    (ejs.renderFile as any)(
      path,
      data,
      (err: Error | null, str: string | undefined) => {
        if (err) {
          console.error('Error rendering EJS template:', err);
          return reject(err);
        }
        if (typeof str !== 'string') {
          return reject(new Error('EJS did not return a string'));
        }
        resolve(str);
      },
    );
  });
}
