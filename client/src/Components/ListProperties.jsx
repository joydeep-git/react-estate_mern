import {
    Card,
    Stack,
    Heading,
    Divider,
    CardBody,
    CardFooter,
    ButtonGroup,
    Button,
    Image,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { IoMdPin } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const ListProperties = ({ listing }) => {
    return (
        <Card maxW={{ base: 'full', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }} className='flex flex-col justify-between'>
            <CardBody>
                <Image
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    borderRadius='lg'
                    boxSize='100%'
                    height='150px'
                    width='225px'
                    objectFit='cover'
                />
                <Stack mt={{ base: '2', md: '4' }} spacing={{ base: '1', md: '2' }}>
                    <Heading size={{ base: 'md', md: 'lg' }}>{listing.name}</Heading>
                    <Text fontSize={{ base: 'xs', md: 'sm' }} className='flex flex-row gap-1 items-center'>
                        <IoMdPin className='text-lg' />
                        {listing.address}
                    </Text>
                    <Button
                        disabled
                        colorScheme="purple"
                        variant='outline'
                        size='sm'
                        width={{ base: 'full', md: '50%' }}
                    >
                        {listing.type === 'rent' ? 'RENT' : 'SALE'}
                    </Button>

                    {listing.discountPrice ? (
                        <div className='flex felx-row gap-3 '>
                            <Text color='blue.600' fontSize={{ base: 'sm', md: 'md' }} fontWeight='700'>
                                $ {listing.discountPrice}
                            </Text>
                            <span className='line-through'>
                                <Text fontSize={{ base: 'xs', md: 'sm' }}> $ {listing.regularPrice}</Text>
                            </span>
                        </div>
                    ) : (
                        <Text color='blue.600' fontSize={{ base: 'sm', md: 'md' }} fontWeight='700'>
                            $ {listing.regularPrice}
                        </Text>
                    )}

                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing={{ base: '1', md: '2' }}>
                    <Button variant='solid' colorScheme='blue'>
                        <Link to={`/listing/${listing._id}`}>See Property</Link>
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default ListProperties;