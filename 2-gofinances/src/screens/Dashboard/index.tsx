import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../hooks/useAuth';

import { useTheme } from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardData } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  income: HighLightProps,
  outcome: HighLightProps,
  total: HighLightProps,
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const { user, signOut } = useAuth();

  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightCardsData, setHighLightCardsData] = useState<HighLightData>({} as HighLightData);

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative' | undefined = undefined
  ) {
    let collectionFiltered: number[] = [];

    collectionFiltered = type
      ? collection
        .filter((transaction: DataListProps) => transaction.type === type)
        .map((transaction: DataListProps) => new Date(transaction.date).getTime())
      : collection
        .map((transaction: DataListProps) => new Date(transaction.date).getTime());

    const lastTransactionDate = new Date(
      Math.max.apply(Math, collectionFiltered)
    );

    return lastTransactionDate;
  }

  async function loadTransactions() {
    const dataKey = `@gofinance:transactions_user:${user?.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
        if (item.type === 'positive') entriesTotal += Number(item.amount);
        else if (item.type === 'negative') expensiveTotal += Number(item.amount);

        const amount = Number(item.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });
        
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          ...item,
          amount,
          date,
        }
      });
    
    setTransactions(transactionsFormatted);

    const lastTransactionDateIncome = getLastTransactionDate(transactions, 'positive');
    const lastTransactionDateOutcome = getLastTransactionDate(transactions, 'negative');
    const lastTransaction = getLastTransactionDate(transactions);
    const totalInterval = `01 à ${lastTransaction.getDate()} de ${lastTransaction.
      toLocaleString('pt-BR', { month: 'long'})
    }`
    
    const incomeAmount = entriesTotal
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    const outcomeAmount = expensiveTotal
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    const totalAmount = Number(entriesTotal - expensiveTotal)
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    setHighLightCardsData({
      income: {
        amount: incomeAmount,
        lastTransaction: `Última entrada dia ${lastTransactionDateIncome.getDate()} de ${lastTransactionDateIncome.
            toLocaleString('pt-BR', { month: 'long'})
          }`
      },
      outcome: {
        amount: outcomeAmount,
        lastTransaction: `Última entrada dia ${lastTransactionDateOutcome.getDate()} de ${lastTransactionDateOutcome.
            toLocaleString('pt-BR', { month: 'long'})
          }`
      },
      total: {
        amount: totalAmount,
        lastTransaction: totalInterval
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer>
      ) : (
        <>
          <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: user?.photo }} />

              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>{user?.name}</UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={signOut}>
              <Icon name="power"/>
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighlightCards>
          <HighlightCard
            title="Total"
            amount={highLightCardsData.total.amount}
            lastTransaction={highLightCardsData.total.lastTransaction}
            type="total"
          />
          <HighlightCard
            title="Entradas"
            amount={highLightCardsData.income.amount}
            lastTransaction={highLightCardsData.income.lastTransaction}
            type="up"
          />
          <HighlightCard
            title="Saídas"
            amount={highLightCardsData.outcome.amount}
            lastTransaction={highLightCardsData.outcome.lastTransaction}
            type="down"
          />
        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>
          
          <TransactionList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        </Transactions>
        </>
      )}
    </Container>
  )
}
