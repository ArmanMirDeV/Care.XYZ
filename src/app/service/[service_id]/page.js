import ServiceDetailContent from '@/components/ServiceDetailContent';

const serviceDetails = {
  'baby-care': {
    title: 'Baby Care Service',
    description: 'Professional and caring babysitting services for your little ones. Our trained caregivers provide safe, nurturing environments for children of all ages.',
  },
  'elderly-care': {
    title: 'Elderly Care Service',
    description: 'Compassionate care services for elderly family members. Our caregivers provide assistance with daily activities, medication management, and companionship.',
  },
  'sick-care': {
    title: 'Sick People Care Service',
    description: 'Specialized care for sick or recovering family members. Our caregivers provide medical support, comfort, and assistance during recovery periods.',
  },
};

export async function generateMetadata({ params }) {
  const { service_id } = await params;
  const service = serviceDetails[service_id];
  
  return {
    title: service ? `${service.title} - Care.xyz` : 'Service Not Found - Care.xyz',
    description: service ? service.description : 'Find the best caregiving services at Care.xyz.',
  };
}

export default async function ServiceDetailPage({ params }) {
  const { service_id } = await params;
  
  return <ServiceDetailContent serviceId={service_id} />;
}
