import * as React from 'react';
import {
  ReferenceArrayInput,
  ReferenceArrayInputProps,
  useGetList,
  useRecordContext,
  useReferenceArrayInputController,
} from 'react-admin';

export const ReferenceManyManyInput: React.FC<
  ReferenceArrayInputProps & { backFilter: string }
> = ({ backFilter, source, reference, ...props }) => {
  // Access the record loaded in the current form
  const record = useRecordContext();
  console.log('RECORD', record);

  // Request associated manyMany records by using a filtered query
  // with backfilter prop
  const { data, total, isLoading, error, refetch } = useGetList(reference, {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'id', order: 'asc' },
    filter: { [backFilter]: record.id },
  });

  console.log('DATA', data);

  // Consume the ReferenceArrayInput by providing fetch data as source
  return (
    <ReferenceArrayInput
      source={data}
      reference={reference}
      {...props}
    ></ReferenceArrayInput>
  );
};
