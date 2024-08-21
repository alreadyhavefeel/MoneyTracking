  import React, { useEffect, useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
  
  // DropDownContainer component
  export function DropDownContainer(props) {
    const walletData = [
      { label: 'Main wallet', value: 1 },
      { label: 'Super Saving', value: 2 },
    ];

    const categoryDataIncome = [
      { label: 'Allowance', value: 1 },
      { label: 'Award', value: 2 },
      { label: 'Bonus', value: 3 },
      { label: 'Dividend', value: 4 },
      { label: 'Bonus', value: 5 },
      { label: 'Investment', value: 6 },
      { label: 'Lottey', value: 7 },
      { label: 'Salary', value: 8 },
      { label: 'Tips', value: 9 },
      { label: 'Others', value: 10 },
    ];

    const categoryDataExpense = [
      { label: 'Bills', value: 1 },
      { label: 'Car', value: 2 },
      { label: 'Clothing', value: 3 },
      { label: 'Education', value: 4 },
      { label: 'Entertainment', value: 5 },
      { label: 'Food', value: 6 },
      { label: 'Gift', value: 7 },
      { label: 'Health', value: 8 },
      { label: 'Housing', value: 9 },
      { label: 'Insurance', value: 10 },
      { label: 'Investment', value: 11 },
      { label: 'Loan', value: 12 },
      { label: 'Others', value: 13 },
      { label: 'Pets', value: 14 },
      { label: 'Shopping', value: 15 },
      { label: 'Transportation', value: 16 },
      { label: 'Travel', value: 17 },
    ];

    //wait for the props to be passed
    const [wallet, setWallet] = React.useState();
    const [categoryIncome, setCategoryIncome] = React.useState(0);
    const [categoryExpense, setCategoryExpense] = React.useState(0);

    useEffect(() => {
      if (props.onSendData) {
        props.onSendData(wallet);
      }
    }, [wallet]);
    
    useEffect(() => {
      if (props.onSendData) {
        props.onSendData(categoryIncome);
      }
    }, [categoryIncome]);
    
    useEffect(() => {
      if (props.onSendData) {
        props.onSendData(categoryExpense);
      }
    }, [categoryExpense]);

    //console.log(value, category);
    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.type === "wallet" ? walletData : props.type === "categoryIncome" ? categoryDataIncome : categoryDataExpense}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={props.placeholder}
        searchPlaceholder="Search..."
        value={props.type === "wallet" ? wallet : props.type === "categoryIncome" ? categoryIncome : categoryExpense}
        onChange={item => {
          if (props.type === "wallet") {
            setWallet(item.value);
          } else if (props.type === "categoryIncome") {
            setCategoryIncome(item.label);
          } else if (props.type === "categoryExpense") {
            setCategoryExpense(item.label);
          }
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="minus" size={12} />
        )}
      />
    );
  };

  const styles = StyleSheet.create({
    dropdown: {
      margin: 0,
      marginTop: 5,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });