import { NewsItem } from '../store/interfaces';
import { isNotEmpty } from '../utils/array-predicates';

export interface NewsResponse {
  total: number;
  currentPage: number;
  pages: number;
  results: NewsItem[];
  pageSize: number;
}

interface GetNewsParams {
  page?: number;
  section?: string;
  searchQuery?: string;
}

const get = async (params: GetNewsParams = {}): Promise<NewsResponse> => {
  const url = buildUrl(params);

  const response = await fetch(url, {
    headers: { 'content-type': 'application-json' },
    mode: 'cors',
  });

  const { response: data } = await response.json();

  const { total, currentPage, pages, results, pageSize } = data;

  return {
    total,
    currentPage,
    pages,
    results: mapResultsToNewsItems(results),
    pageSize,
  };
};

const getDates = (): [Date, Date] => {
  const now = new Date();

  const monthAgo = new Date(new Date().setDate(now.getDate() - 30));

  return [monthAgo, now];
};

const buildUrl = ({
  searchQuery = '',
  section = '',
  page = 1,
}: GetNewsParams): string => {
  const AUTH_TOKEN = 'dca5b3c8-148e-4d6d-9cbe-8eb8ae189179'; // Only for the task purpouse. Never call a third API directly from the client.
  const BASE_URL = 'https://content.guardianapis.com/search';
  const [fromDate, toDate] = getDates();

  const query = [
    ['api-key', AUTH_TOKEN],
    ['page-size', 10],
    ['from-date', fromDate.toISOString()],
    ['to-date', toDate.toISOString()],
    ['page', page ?? 1],
    ['order-by', 'newest'],
    searchQuery ? ['q', searchQuery] : null,
    section ? ['section', section] : null,
  ]
    .filter(isNotEmpty)
    .map((pair) => pair.join('='))
    .join('&');

  return `${BASE_URL}?${query}`;
};

const mapResultsToNewsItems = (results: any): NewsItem[] => {
  return results.map(
    ({ id, sectionName, webTitle, webPublicationDate, webUrl }: any) => ({
      id,
      sectionName,
      title: webTitle,
      publicationDate: webPublicationDate,
      url: webUrl,
    })
  );
};

export const newsApi = {
  get,
};
