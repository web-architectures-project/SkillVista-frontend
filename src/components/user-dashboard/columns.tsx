import { ColumnDef } from '@tanstack/react-table'

// service_id (Primary Key)
// provider_id (Foreign Key referencing users.user_id where user_type is 'service_provider')
// service_type
// description
// pricing
// availability
// date_created

export type TUserDashboardTable = {
  //   Provider is mainly what (global eg. Plumber, Electrician, etc) service do they provide
  service_id: string
  provider: string
  short_description: string
  pricing: string
  availability: string
}

export const columns: ColumnDef<TUserDashboardTable>[] = [
  {
    accessorKey: 'provider',
    header: 'Provider',
  },
  {
    accessorKey: 'short_description',
    header: 'Short Description',
  },
  {
    accessorKey: 'availability',
    header: 'Availability',
  },
  {
    accessorKey: 'pricing',
    header: 'Pricing',
  },
]
