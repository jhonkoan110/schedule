import { Card, CardHeader } from '@material-ui/core';
import React from 'react';
import Block from '../Block/Block';

interface ErrorProps {
    error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
    return (
        <Block>
            <Card>
                <CardHeader title={error} />
            </Card>
        </Block>
    );
};

export default Error;
