"use client"
import React, { useEffect } from 'react'

import { Card, Image, Text, Badge, Button, Group, Modal, Alert } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Anchor } from '@mantine/core';

import { useState } from 'react';

import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"

export type bookInfo = {
    id: string,
    bookTitle: string,
    bookDescription: string
    bookPublishedDate: string,
    bookImageLinks: string
}

const bookCard = ({id, bookTitle, bookDescription, bookPublishedDate, bookImageLinks} : bookInfo) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
  <div>
      <Modal size="90%" opened={opened} onClose={close} title={bookTitle} centered>
        <Image width="300px" src={bookImageLinks}></Image>
        <Text>Published date: {bookPublishedDate}.</Text>
        <Text>Description: {bookDescription? bookDescription : "No description found"}</Text>
      </Modal>
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Card.Section>
        <Image
          src={bookImageLinks}
          height={160}
          alt={bookTitle}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{bookTitle? bookTitle.length > 30? bookTitle.slice(0,30)+"..." : bookTitle.padEnd(30,"\u00A0") : ""}</Text>
       
      </Group>

      <Text size="sm" c="dimmed">
        {bookDescription? bookDescription.slice(0, 15)+"...": "Found no description"}
      </Text>

      <Button onClick={open} variant="light" color="blue" fullWidth mt="md" radius="md">
        Book Details
      </Button>
    </Card>
    </div>
    
    </>
  );
}

export default bookCard