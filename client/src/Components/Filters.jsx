import React from 'react';
import { FormLabel, Checkbox, Stack, RadioGroup, Radio, Select, Button, Box, Center, useBreakpointValue } from '@chakra-ui/react';

const Filters = ({ setState, sideBar, setSideBar, submitForm }) => {

    const boxWidth = useBreakpointValue({ base: "95%", md: "65%" });

    const handleChange = (e) => {
        const { name, checked } = e.target;

        setSideBar({
            ...sideBar,
            [name]: checked
        })
    };

    const handleTypeChange = (value) => {
        setSideBar(prevState => ({
            ...prevState,
            type: value
        }));
    };

    const handleSortChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];

        setSideBar({
            ...sideBar,
            sort: selectedOption.getAttribute("data-name"),
            order: selectedOption.getAttribute("data-id"),
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        submitForm();
    };

    return (
        <Center position="fixed" width="100%" height="100%" left="0" top="0" zIndex="1000" bg="rgba(0, 0, 0, 0.5)">
            <Box p={6} flexDirection="column" gap={4} borderWidth={1} borderColor="emerald.400" rounded="xl" opacity={1} bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={boxWidth}
                maxWidth="500px"
                maxHeight="90vh"
                overflowY="auto"
                style={{ gap: "2rem" }}
            >
                <Box flexDirection='row'>
                    <FormLabel fontWeight={"700"} fontSize={"1.25rem"} style={{ textAlign: "center", textTransform: "uppercase" }}>Property type</FormLabel>
                    <RadioGroup name="type" value={sideBar?.type} onChange={handleTypeChange}
                        style={{ display: "flex", gap: "1.5rem" }}>
                        <Radio size='lg' value='all'>
                            ALL
                        </Radio>
                        <Radio size='lg' value='rent'>
                            RENT
                        </Radio>
                        <Radio size='lg' value='sell'>
                            SELL
                        </Radio>
                    </RadioGroup>
                </Box>
                <Box>
                    <Stack spacing={5} direction='row' style={{ flexWrap: "wrap" }}>
                        <Checkbox size='lg' name="offer" isChecked={sideBar.offer} onChange={handleChange}>
                            Discount / Offer
                        </Checkbox>
                        <Checkbox size='lg'
                            name="parking"
                            isChecked={sideBar.parking}
                            onChange={handleChange}>
                            Parking
                        </Checkbox>
                        <Checkbox size='lg'
                            name="furnished"
                            isChecked={sideBar.furnished}
                            onChange={handleChange}>
                            Furnished
                        </Checkbox>
                    </Stack>
                </Box>
                <Box style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <FormLabel>SORT: </FormLabel>
                    <Select variant="solid" style={{ border: "1px solid rgb(16 185 129)", fontWeight: "700" }}
                        name="sort"
                        value={sideBar.sort + "_" + sideBar.order}
                        onChange={handleSortChange}>
                        <option data-name='createdAt' value='createdAt_desc' data-id='desc' >LATEST</option>
                        <option data-name='createdAt' value="createdAt_asc" data-id='asc'>OLDEST</option>
                        <option data-name='regularPrice' value='regularPrice_asc' data-id='asc'>PRICE: LOW TO HIGH</option>
                        <option data-name='regularPrice' value='regularPrice_desc' data-id='desc'>PRICE: HIGH TO LOW</option>
                    </Select>
                </Box>
                <Button
                    variant='solid'
                    colorScheme='teal'
                    onClick={handleSubmitForm}>
                    SEARCH
                </Button>
                <Button onClick={() => setState(false)} colorScheme='red' variant='solid'>
                    CLOSE
                </Button>
            </Box>
        </Center>
    );
}

export default Filters;
