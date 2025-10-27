export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
  placeholder?: string;
  disabled?: boolean;
}
