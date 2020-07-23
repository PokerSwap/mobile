import React, {useContext} from 'react';
import { Container, View, Content, Text } from 'native-base';
import OtherHeader from '../View-Components/OtherHeader'
import { useNavigation } from '@react-navigation/native'

import { Context } from '../Store/appContext'

FAQItem = (props) => {
  return(
    <View style={{flexDirection:'column', marginVertical:10, marginLeft:20}}>
      <Text style={{fontSize:18, fontWeight:'bold', textAlign:'left', marginBottom:3}}>
        {props.question}
      </Text>
      <Text style={{fontSize:18, textAlign:'left'}}>
        {props.answer}
      </Text>
    </View>
  )
}


export default FAQScreen = (props) => {
  
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()

  return(
    <Container>
      <OtherHeader title={'FAQs'} 
        goBackToHome={() => navigation.goBack(null)}/>
      <Content contentContainerStyle={{width:'90%', justifyContent:'center'}}>
        <FAQItem question={faq.one.question} answer={faq.one.answer} />
        <FAQItem question={faq.two.question} answer={faq.two.answer} />
        <FAQItem question={faq.three.question} answer={faq.three.answer} />
        <FAQItem question={faq.four.question} answer={faq.four.answer} />
        <FAQItem question={faq.five.question} answer={faq.five.answer} />
        <FAQItem question={faq.six.question} answer={faq.six.answer} />
        <FAQItem question={faq.seven.question} answer={faq.seven.answer} />
        <FAQItem question={faq.eight.question} answer={faq.eight.answer} />
        <FAQItem question={faq.nine.question} answer={faq.nine.answer} />
        <FAQItem question={faq.ten.question} answer={faq.ten.answer} />
        <FAQItem question={faq.eleven.question} answer={faq.eleven.answer} />
        <FAQItem question={faq.twelve.question} answer={faq.twelve.answer} />
        <FAQItem question={faq.thirteen.question} answer={faq.thirteen.answer} />
        <FAQItem question={faq.fourteen.question} answer={faq.fourteen.answer} />
        <FAQItem question={faq.fifteen.question} answer={faq.fifteen.answer} />
        <FAQItem question={faq.sixteen.question} answer={faq.sixteen.answer} />
        <FAQItem question={faq.seventeen.question} answer={faq.seventeen.answer} />
        <FAQItem question={faq.eighteen.question} answer={faq.eighteen.answer} />
        <FAQItem question={faq.nineteen.question} answer={faq.nineteen.answer} />
        <FAQItem question={faq.twentyone.question} answer={faq.twentyone.answer} />
        <FAQItem question={faq.twentytwo.question} answer={faq.twentytwo.answer} />
        <FAQItem question={faq.twentythree.question} answer={faq.twentythree.answer} />
        <FAQItem question={faq.twentyfour.question} answer={faq.twentyfour.answer} />
      </Content>  
    </Container>
  )
}

const faq = {
  one:{
    question:'How does Swap Profit work?',
    answer:'Swap Profit provides the ability for competitors in events to Swap percentages of potential profits with each other, as well as earn rewards for event entries.  Swap Profit provides event information, ability to Swap within events, and event results.'
  },
  two:{
    question:'Does it cost me anything to Swap?',
    answer:'All Swaps require Swap Tokens – Swap Token amounts may vary based on the event or the type of Swap.'
  },
  three:{
    question:'Who can see who I am Swapping with?',
    answer:'Only you and your Swappers can see your Swaps.'
  },
  four:{
    question:'What happens if I change my mind and want to cancel a Swap?',
    answer:'Once both parties have agreed to a Swap, the Swap cannot be cancelled.'
  },
  five:{
    question:'How does the “Swap Profit Model” work?',
    answer:'The Swap Profit Model is:\n Your Earnings in the Event MINUS ONE (1) entry fee in your event = Profit that counts towards your Swap.'
  },
  six:{
    question:'What happens if I am in a buy-in event with re-entries and I re-enter the event?  Are all of my Swaps cancelled from my first entry buy-in?',
    answer:'Once you agree to a Swap in an event, any and all Swaps in that event remain active for the duration of the event regardless of how many times you re-enter.  No, your Swaps from your first entry buy-in are NOT cancelled – they will remain active for the duration of the event.'
  },
  seven:{
    question:'How do I collect my Swap earnings from the event?',
    answer:'Swap Profit DOES NOT have any involvement in the procuring of earnings for Swaps between Users.  Once you have received your Swap Results Email, it is purely up to you to collect/pay your Swaps.  You will have a temporary chat available through the Swap App with any Users where a Swap Result has qualified of earnings.  Please keep in mind that your Swap Rating will be affected by promptness of your Swap transaction finality.'
  },
  eight:{
    question:'What is “Swap ROI”?',
    answer:'Swap ROI is the percentage of times that you have Swapped with someone and your Swapper has made a profit from you.  This percentage number will fluctuate based on each individual Swap from your event results.'
  },
  nine:{
    question:'What happens if I don’t pay out on a Swap?',
    answer:'If you do not pay out on a Swap after seven (7) calendar days from receipt of Swap Results, your Swap Account will be frozen and you will not be able to continue to Swap until your pending Swaps have been finalized to completion.  Please be aware that your original Swap Agreement – emailed to both Swap parties – is legally binding.  You may end up in court if your Swapper goes that route.  You will also be put on the “Naughty List.”'
  },
  ten:{
    question:'What is the “Naughty List”?',
    answer:'The Naughty List is the public listing of Users who have open unpaid One-Star Swaps (they have not paid their Swaps after seven calendar days of receipt of Swap Results).  If you are hoping to collect on potential earnings from your Swappers, it may be to your benefit to not Swap with these Users.'
  },
  eleven:{
    question:'How do I get removed from the “Naughty List”?',
    answer:'Pay out your unpaid Swap(s).'
  },
  twelve:{
    question:'I am trying to pay out on a Swap, but I am having issues.  What can I do so that my Swap Rating does not get affected by this?',
    answer:'If you are having trouble paying out on a Swap, click on the “Swap Issues” button in that Swap and email our Swap Support Team.  We will help you resolve the issue and adjust your Swap Rating accordingly.'
  },
  thirteen:{
    question:'What about taxes?  Are my Swap payouts and/or earnings based on tax payouts?',
    answer:'No, all Swap payouts and/or earnings are not based on tax payouts.  Swap payouts and earnings are NOT based on any potential tax implications.  All Swap Users are liable for their own accounting for taxes SEPARATE of any Swap payouts and/or earnings.'
  },
  fourteen:{
    question:'Can I do additional Swaps in the same event with the same Users I already have active Swaps with?',
    answer:'Yes.  You can do as many Swaps with whomever you would like – including Users you already have active Swaps with - as long as you have not gone over your 50% Swap threshold.'
  },
  fifteen:{
    question:'I am trying to do another Swap but my Swap percentage for the event is showing “Maxed Out.”  What do I do?',
    answer:'All Users are allowed to do a maximum of fifty (50) percent of Swaps in any single event.  If you are receiving the “Maxed Out” alert in an event, that means that you have already reached your 50% maximum for that particular event.  If you have any “Pending Swaps” in that event, you may decide to cancel them to Swap with another User.'
  },
  sixteen:{
    question:'The event that I was in has concluded.  When will I receive the official results from the event?',
    answer:'As soon as we receive the official results from any event, we will send out Swap Results for that event.'
  },
  seventeen:{
    question:'Someone else has claimed my Hendon Mob profile.  What do I do?',
    answer:'Contact our Swap Support Team – we will help you resolve this issue.'
  },
  eighteen:{
    question:'I chopped my event, but the Official Results show that I was paid a different amount than what I received.  What do I do?',
    answer:'Swap Payouts are based on the Official Results received directly from the event.  Before agreeing to a chop, you should ask a Tournament Director at the venue your event is at how the results will be posted.  You will be held liable for the earnings amount shown in any Official Results that Swap receives.'
  },
  nineteen:{
    question:'I am in a Bounty event.  Do Bounties count towards Swap earnings?',
    answer:'No, Bounties will NOT count as earnings towards Swaps.  Only your event cash payout earnings will count towards Swaps.'
  },
  twentyone:{
    question:'I won a High Hand in the event I was in.  Does High Hand count towards Swap earnings?',
    answer:'No, High Hand payouts will NOT count as earnings towards Swaps.  Only your event cash payout earnings will count towards Swaps.'
  },
  twentytwo:{
    question:'I won an additional seat entry in the event I was in.  Does the additional seat entry count towards Swap earnings?',
    answer:'No, additional seat entry winnings will NOT count as earnings towards Swaps.  Only your event cash payout earnings will count towards Swaps.'
  },
  twentythree:{
    question:'I won an additional prize for bagging my amount of chips in an opening flight.  Does this additional prize count towards Swap earnings?',
    answer:'No, additional prize(s) for bagging any amount of chips will NOT count as earnings towards Swaps.   Only your event cash payout earnings will count towards Swaps.'
  },
  twentyfour:{
    question:'I won a trophy in my event.  Do I have to share my trophy with my Swappers?',
    answer:'No, the trophy is yours.  Nice job!'
  }
}


