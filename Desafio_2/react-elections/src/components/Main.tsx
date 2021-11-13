import {
  Flex,
  Heading,
  Select,
  Text,
  AspectRatio,
  Image,
  Badge,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import elections from "../data/elections.json";
import NonElectedCards from "./NonElectedCards";

export default function Main() {
  const [option, setOption] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (option !== "") {
      toast({
        description: "Você alterou o município.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [option]);

  function generateCities() {
    return elections.cities.map((item, key) => (
      <option value={item.id} key={key}>
        {item.name}
      </option>
    ));
  }

  const candidates = elections.election
    .filter((item) => item.cityId === option)
    .map(({ votes, candidateId }) => {
      return { votes, candidateId };
    });

  const orderedCandidates = candidates.sort((a, b) => b.votes - a.votes);

  const electedCandidate =
    orderedCandidates.length > 0 &&
    elections.candidates
      .filter((candidate) => candidate.id === orderedCandidates[0].candidateId)
      .pop();

  const nonElectedCandidatesVotes = orderedCandidates.slice(
    1,
    orderedCandidates.length
  );

  const nonElectedCandidatesIds = nonElectedCandidatesVotes.map(
    (candidate) => candidate.candidateId
  );

  const nonElectedCandidates = elections.candidates.filter((candidate) =>
    nonElectedCandidatesIds.includes(candidate.id)
  );

  const allDataOfNonElectedCandidates = nonElectedCandidates.map(
    (candidate) => {
      const votes = nonElectedCandidatesVotes
        .filter((candidateVotes) => candidateVotes.candidateId === candidate.id)
        .pop()?.votes;
      return {
        ...candidate,
        votes,
      };
    }
  );

  console.log({
    nonElectedCandidates,
    nonElectedCandidatesVotes,
    allDataOfNonElectedCandidates,
  });

  return (
    <Flex bg="bottom-header" w="100vw" h="100vh" color="white">
      <Container>
        <Flex direction="column" w="100%" h="100%">
          <Flex justify="center" w="100%" h="10%" align="center">
            <Select
              cursor="pointer"
              onChange={(event) => setOption(event.target.value)}
              placeholder="Selecione o município"
              bg="top-header"
              w="300px"
              borderColor="detail"
              color="main-text"
              filter="brightness(1.75)"
              fontSize="14px"
              fontWeight="normal"
            >
              {generateCities()}
            </Select>
          </Flex>
          <Flex w="100%" h="90%">
            <Flex
              h="30%"
              w="full"
              justify="space-between"
              align="center"
              p="10px"
            >
              <Flex direction="column" w="30%" color="main-text" h="full">
                <Heading
                  as="h1"
                  fontWeight="bold"
                  fontFamily="poppins"
                  fontSize="25px"
                  lineHeight="30px"
                >
                  Eleição em{" "}
                  {elections.cities
                    .filter((item) => item.id === option)
                    .map((item) => item.name)}
                </Heading>
                <Text>
                  {
                    elections.election.filter((item) => item.cityId === option)
                      .length
                  }{" "}
                  candidatos
                </Text>
                <Flex
                  marginTop="25px"
                  gridGap="10px"
                  direction="column"
                  w="100%"
                >
                  <Flex w="full">
                    <Text fontWeight="bold" fontSize="18px" w="80%">
                      Total de eleitores:
                    </Text>
                    <Text fontSize="18px" w="20%">
                      {elections.cities
                        .filter((item) => item.id === option)
                        .map((item) => item.votingPopulation)}
                    </Text>
                  </Flex>{" "}
                  <Flex>
                    <Text fontWeight="bold" fontSize="18px" w="80%">
                      Total de abstenções:
                    </Text>
                    <Text fontSize="18px" w="20%">
                      {elections.cities
                        .filter((item) => item.id === option)
                        .map((item) => item.absence)}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" fontSize="18px" w="80%">
                      Total de comparecimentos:
                    </Text>
                    <Text fontSize="18px" w="20%">
                      {elections.cities
                        .filter((item) => item.id === option)
                        .map((item) => item.presence)}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex w="55%" h="full" color="main-text">
                <Flex
                  bg="top-header"
                  border="2px"
                  borderColor="detail"
                  borderRadius="15px"
                  p="10px"
                  w="100%"
                  h="100%"
                >
                  <Flex gridGap="20px" w="full" h="full">
                    <AspectRatio w="30%" ratio={4 / 3}>
                      <Image
                        src="https://exame.com/wp-content/uploads/2018/10/thor-ragnarok-filme-cultura-vip.jpg"
                        alt="naruto"
                        objectFit="cover"
                        borderRadius="15px"
                      />
                    </AspectRatio>
                    <Flex direction="column" w="70%" p="10px" gridGap="10px">
                      <Heading as="h4" fontSize="20px">
                        {orderedCandidates.length > 0 &&
                          electedCandidate &&
                          electedCandidate.name}
                        , novo candidato eleito!
                      </Heading>
                      <Text>
                        {orderedCandidates.length > 0 &&
                          elections.election
                            .filter(
                              (candidate) =>
                                candidate.votes === orderedCandidates[0].votes
                            )
                            .map((vote) => vote.votes)}{" "}
                        votos computados
                      </Text>
                      <Flex justify="space-between">
                        <Badge
                          bg="elected"
                          h="38px"
                          w="75px"
                          p="5px 10px"
                          borderRadius="15px"
                          fontSize="18px"
                          color="white"
                          fontWeight="normal"
                        >
                          Eleito
                        </Badge>
                        <Text fontSize="50px" fontWeight="bold" color="elected">
                          45.68%
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <NonElectedCards nonelected={allDataOfNonElectedCandidates} />
        </Flex>
      </Container>
    </Flex>
  );
}
