import { UseQueryResult } from '@tanstack/react-query';
import { CityWeather } from '../../services/getWeather';

export interface TableProps {
  tableData: UseQueryResult<CityWeather, unknown>[];
  isLoading: boolean;
  deleteLocation: (string) => void;
}
