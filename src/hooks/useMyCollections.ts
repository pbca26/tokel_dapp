import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectAccountPubKey, selectMyTokenDetails } from 'store/selectors';

import { SelectOption } from 'components/_General/_FormikElements/Select';

type Collections = Record<string, SelectOption>;

const useMyCollections = (): Collections => {
  const tokenDetails = useSelector(selectMyTokenDetails);
  const myPubKey = useSelector(selectAccountPubKey);

  const collectionsMap = useMemo(
    () =>
      Object.values(tokenDetails).reduce((collections, { owner, supply, dataAsJson }) => {
        if (
          owner === myPubKey &&
          supply === 1 &&
          Boolean(dataAsJson?.id) &&
          Boolean(dataAsJson?.arbitraryAsJson?.collection_name)
        ) {
          return {
            ...collections,
            [dataAsJson.id]: {
              label: dataAsJson.arbitraryAsJson.collection_name,
              value: dataAsJson.id,
            },
          };
        }
        return collections;
      }, {}),
    [tokenDetails, myPubKey]
  );

  return collectionsMap;
};

export default useMyCollections;
