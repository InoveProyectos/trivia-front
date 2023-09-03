import I18N from "../utils/i18n.json";
const useTextos = () => {
  const translations: Record<string, string> = I18N;

  const searchTextByKey = (key: string) => {
    return translations[key];
  };

  return {
    searchTextByKey,
  };
};

export default useTextos;
