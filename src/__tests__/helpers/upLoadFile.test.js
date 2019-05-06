import request from 'superagent';
import mock from 'superagent-mock';
import upLoadFile from '../../helpers/upLoadFile';
import { file, urlValue } from '../../__mocks__/dummyData';

describe('upLoadFile', () => {
  const API_URL = process.env.UPLOAD_URL;
  test('should upload file', () => {
    const config = [
      {
        pattern: API_URL,
        fixtures: () => ({
          body: { secure_url: urlValue },
        }),
        post: (match, data) => data,
      },
    ];
    mock(request, config);
    return upLoadFile(JSON.stringify(file)).then((res) => {
      expect(res).toEqual(urlValue);
    });
  });

  test('should return null in case url = is empty', () => {
    const config = [
      {
        pattern: API_URL,
        fixtures: () => ({
          body: { secure_url: '' },
        }),
        post: (match, data) => data,
      },
    ];
    mock(request, config);
    return upLoadFile(JSON.stringify(file)).then((res) => {
      expect(res).toEqual(null);
    });
  });

  test('should return null in case url = is empty', () => {
    const config = [
      {
        pattern: API_URL,
        post: (match, data) => data,
      },
    ];
    mock(request, config);
    return upLoadFile(JSON.stringify(file)).then((err) => {
      expect(err).toBeDefined();
    });
  });
});
