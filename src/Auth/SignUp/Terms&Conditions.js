import React, {} from 'react';
import { Button, Card, CardItem, 
Container, Content, Text, H2 } from 'native-base';

export default  TermsAndConditions = (props) => {
  return(
    <Container>
      <Content contentContainerStyle={{alignContent:"center",justifyContent:"center"}}>
        
        {/* PAGE CONTAINER */}
        <Card transparent style={{justifyContent:"center"}} >
          
          {/* PAGE TITLE */}
          <CardItem header style={{justifyContent:"center"}}>
            <H2 style={{textAlign:'center'}}>Terms And Conditions</H2>
          </CardItem> 
          
          {/* PAGE BODY */}
          <CardItem style={{justifyContent:"center", flexDirection:'column'}}>
            {fullList.map((content,index) =>
            <Text style={{textAlign:"auto", width:'95%', marginVertical:5, fontSize:16, lineHeight:22}}>
              {content}
            </Text>)}
          </CardItem>
          
          {/* PAGE BUTTON */}
          <CardItem style={{justifyContent:"center"}}>
            <Button large onPress={()=> props.navigation.navigate('UserCreation')}>
              <Text>I AGREE</Text>
            </Button>
          </CardItem>

        </Card>
      </Content>
    </Container>     
  )
}


const fullList = [

'   Swap Profit, LLC. (“Swap Profit,” “we,” “us,” “our”) provides its services (described \
below) to you through its websites located at www.swapprofitonline.com and through its \
mobile applications and related services (collectively, such services, including any new \
features and applications, and the Site, the “Service(s)”), subject to the following Terms \
of Service (as amended from time to time, the “Terms of Service”). We reserve the right, \
at our sole discretion, to change or modify portions of these Terms of Service at any \
time. If we do this, we will post the changes on this page and will indicate at the top of \
this page the date these terms were last revised. We will also notify you, either through \
the Services user interface, in an email notification or through other reasonable means. \
Any such changes will become effective no earlier than fourteen (14) days after they are \
posted, except that changes addressing new functions of the Services or changes made \
for legal reasons will be effective immediately. Your continued use of the Service after \
the date any such changes become effective constitutes your acceptance of the new \
Terms of Service.',
    
'PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS THEY CONTAIN AN \
AGREEMENT TO ARBITRATE AND OTHER IMPORTANT INFORMATION \
REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. THE \
AGREEMENT TO ARBITRATE REQUIRES (WITH LIMITED EXCEPTION) THAT YOU \
SUBMIT CLAIMS YOU HAVE AGAINST US TO BINDING AND FINAL ARBITRATION, \
AND FURTHER (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS \
AGAINST SWAP PROFIT ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR \
CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR \
PROCEEDING, AND (2) YOU WILL ONLY BE PERMITTED TO SEEK RELIEF \
(INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ON AN \
INDIVIDUAL BASIS.',

    
'In addition, when using certain services, you will be subject to any additional terms \
applicable to such services that may be posted on the Service from time to time, \
including, without limitation, the Privacy Policy located at \
https://www.swapprofitonline.com/privacy/ . All such terms are hereby incorporated by \
reference into these Terms of Service.',
    
'Access and Use of the Service',
    
'Services Description: The Service is designed to 1. Offer our users to ability to earn \
rewards on entries made into competitive events such as fishing, golf, fitness, poker \
tournaments and more. 2. Offer listings of these events to our users and discounts \
when applicable. 3. Offer our users the ability to swap potential profits in these events \
with other competitors.',

'USER UNDERSTANDS THAT SWAP PROFIT DOES NOT GUARANTEE PAYOUTS \
BETWEEN USERS. SWAP PROFIT IS ONLY FACILITATING SWAPS BY PROVIDING \
A COMMUNITY MARKETPLACE FOR USERS TO COMMUNICATE, AS WELL AS \
WRITTEN AGREEMENTS BETWEEN USERS ONCE A SWAP HAS TAKEN PLACE. \
SWAP PROFIT IS NOT LIABLE FOR ACTUAL PAYOUTS BETWEEN USERS ONCE A \
COMPETITION IS COMPLETED AND RESULTS PUBLISHED. SWAP PROFIT WILL \
PROVIDE USERS PREFERRED PAYMENT METHODS TO THEIR SWAP PARTNERS \
AND COMPLETED PAYMENTS BETWEEN USERS WILL BE TRACKED, POSTED TO \
THEIR PROFILES AND CALCULATED INTO A USER’S SWAP RATING. AFTER A \
COMPLETED INVESTIGATION, ANY NONPAYMENT ON A CONFIRMED SWAP \
WILL RESULT IN THE IMMEDIATE TERMINATION OF A USERS ACCOUNT AND \
SWAP PROFIT WILL COOPERATE IN ANY LEGAL ACTION THE NON-PAID PARTY \
DECIDES TO PURSUE. SWAP PROFIT AT ITS DISCRETION MAY ALSO REPORT \
NON-PAYMENT OF SWAPS TO RESPECTIVE INDUSTRY MEDIA OUTLETS SO \
THAT OTHER PARTICIPANTS ARE AWARE– see our SWAP RATING POLICY.',
    
'Your Registration Obligations: You may be required to register with Swap Profit in order \
to access and use certain features of the Service. If you choose to register for the \
Service, you agree to provide and maintain true, accurate, current and complete \
information about yourself as prompted by the Service’s registration form. Registration \
data and certain other information about you are governed by our Privacy Policy. If you \
are under 13 years of age, you are not authorized to use the Service, with or without \
registering. In addition, if you are under 18 years old, you may use the Service, with or \
without registering, only with the approval of your parent or guardian.',
    
'Member Account, Password and Security: You are responsible for maintaining the \
confidentiality of your password and account, if any, and are fully responsible for any \
and all activities that occur under your password or account. You agree to immediately \
notify Swap Profit of any unauthorized use of your password or account or any other \
breach of security. Swap Profit will not be liable for any loss or damage arising from \
your failure to comply with this Section.',
    
'Modifications to Service: Swap Profit reserves the right to modify or discontinue, \
temporarily or permanently, the Service (or any part thereof) with or without notice. You \
agree that Swap Profit will not be liable to you or to any third party for any modification, \
suspension or discontinuance of the Service.',
    
'General Practices Regarding Use and Storage: You acknowledge that Swap Profit may \
establish general practices and limits concerning use of the Service, including without \
limitation the maximum period of time that data or other content will be retained by the \
Service and the maximum storage space that will be allotted on Swap Profit’s servers \
on your behalf. You agree that Swap Profit has no responsibility or liability for the \
deletion or failure to store any data or other content maintained or uploaded by the \
Service. You acknowledge that Swap Profit reserves the right to terminate accounts that \
are inactive for an extended period of time. You further acknowledge that Swap Profit \
reserves the right to change these general practices and limits at any time, in its sole \
discretion, with or without notice.',
    
'Mobile Services: The Service includes certain services that are available via a mobile \
device, including (i) the ability to upload content to the Service via a mobile device, (ii) \
the ability to browse the Service and the Site from a mobile device and (iii) the ability to \
access certain features through an application downloaded and installed on a mobile \
device (collectively, the “Mobile Services”). To the extent you access the Service \
through a mobile device, your wireless service carrier’s standard charges, data rates \
and other fees may apply. In addition, downloading, installing, or using certain Mobile \
Services may be prohibited or restricted by your carrier, and not all Mobile Services may \
work with all carriers or devices. By using the Mobile Services, you agree that we may \
communicate with you regarding Swap Profit and other entities by SMS, MMS, text \
message or other electronic means to your mobile device and that certain information \
about your usage of the Mobile Services may be communicated to us. In the event you \
change or deactivate your mobile telephone number, you agree to promptly update your \
Swap Profit account information to ensure that your messages are not sent to the \
person that acquires your old number.', 
    
'Swap Profit Rewards Program',
'General: As part of the Services, Swap Profit lets you accumulate rewards by buying \
certain products with an associated Swap Profit Rewards value (a &quot;Swap Profit Offer&quot;). \
We have created mobile applications and websites that let our members upload or \
email photos of their receipts so we can validate their purchase of products and \
services associated with a Swap Profit Offer and begin to accumulate Swap Profit \
Rewards. We may also validate our members’ purchase of products associated with a \
Swap Profit Offer through retailer or other partner-provided transaction log data, receipt \
data using a unique identifier (such as a loyalty card number, credit card number, phone \
number, etc.) to match a Swap Profit member to a transaction, or the user’s location as \
determined by the phone.',

'You are only permitted to earn Swap Profit Rewards on purchases and transactions that \
you personally have made. If we discover that you have (1) violated the foregoing, (2) \
provided us with receipts or purchase confirmations for purchases and transactions \
made by someone other than you, or (3) provided us with fraudulent or erroneous \
receipts or purchase confirmations, we may deactivate your account in our sole \
discretion and/or deduct any fraudulently earned Swap Profit Rewards from your \
account.',

'Exchanging Swap Profit Rewards: You may redeem Swap Profit Rewards solely by \
using it toward certain approved purchases as described in the Services. Swap Profit \
Rewards may only be redeemed at the particular establishment where such Swap Profit \
Rewards were earned. The Services may impose a limit to the number of Swap Profit \
Rewards that can be applied to a particular purchase. Once the Swap Profit Rewards \
are redeemed, your Rewards balance shall be credited with the amount of Swap Profit \
Rewards redeemed. In the event a merchant ceases being part of the Services, we may \
allow you to transfer the Swap Profit Rewards for such merchant to another merchant, \
but we are not obligated to do so.',

'No interest is paid on Swap Profit Rewards balances. You have no property rights or \
other legal interest in the Swap Profit Rewards for any purpose. All Swap Profit \
Rewards remain the sole property of Swap Profit until redeemed per these Terms of \
Service. Except as otherwise provided herein, your Swap Profit Rewards balance or any \
part of it is not transferable, cannot be divided as part of a settlement, legal proceeding \
or death, and cannot be combined with Swap Profit Rewards of any other user of the \
Services.',

'Violation of Terms: If we determine in our sole discretion that you have violated the \
Terms, we may in our sole discretion and as permitted by law, terminate your account \
and any pending, current, or future Swap Profit Rewards balance you may have \
immediately expires. We will notify you of such termination at the email address \
associated with your account, and such termination shall be effective immediately.',

// Swap Profit Payout Model
// General: Swap Profit computes Payouts in the following model

// Earnings (any amount earned by the User in the event in which the User has registered
// for)
// Minus
// One (1) original price of entry
// Equals:
'Profits that will be counted towards Swap Payouts.',
'If the event the User is competing in is a re-entry event, additional re-entries will NOT \
be credited and ALL OF THE USERS ORIGINAL SWAPS WILL STILL BE ACTIVE \
FOR THE DURATION OF THE EVENT.',
'User will still receive any applicable rewards for each tournament receipt that is \
uploaded.',

'Responsibility for Taxes: You agree that you are solely responsible for all applicable \
federal, state, or provincial withholding, taxes, and government fees or costs associated \
with Swap Profit Rewards and any exchanges and distributions. We may ask you for a \
valid tax identification number for reporting purposes. Tax forms, such as an IRS Form \
1099, may be issued in your name for the actual value of Rewards that we send you.',

'Swap Profit Payout – Poker Tournaments',
'The following earnings will NOT be included in any poker tournament payouts:',
'- Bounties',
'- High Hands',
'- Tournament Seat Entries',
'- Add-Ons of any kind',
'- Rebuys',
'Conditions of Use',
'User Conduct: You are solely responsible for all code, video, images, information, data, \
text, software, music, sound, photographs, graphics, messages or other materials \
(“content”) that you upload, post, publish or display (hereinafter, “upload”) or email or \
otherwise use via the Service. The following are examples of the kind of content and/or \
use that is illegal or prohibited by Swap Profit. Swap Profit reserves the right to \
investigate and take appropriate legal action against anyone who, in Swap Profit’s sole \
discretion, violates this provision, including without limitation, removing the offending \
content from the Service, suspending or terminating the account of such violators and \
reporting you to the law enforcement authorities.',

'You agree to not use the Service to:',

'-- email or otherwise upload any content that (i) infringes any intellectual property or other \
proprietary rights of any party; (ii) you do not have a right to upload under any law or \
under contractual or fiduciary relationships; (iii) contains software viruses or any other \
computer code, files or programs designed to interrupt, destroy or limit the functionality \
of any computer software or hardware or telecommunications equipment; (iv) poses or \
creates a privacy or security risk to any person; (v) constitutes unsolicited or \
unauthorized advertising, promotional materials, commercial activities and/or sales, \
“junk mail,” “spam,” “chain letters,” “pyramid schemes,” “contests,” “sweepstakes,” or \
any other form of solicitation; (vi) is unlawful, harmful, threatening, abusive, harassing, \
tortious, excessively violent, defamatory, vulgar, obscene, pornographic, libelous, \
invasive of another’s privacy, hateful racially, ethnically or otherwise objectionable; or \
(vii) in the sole judgment of Swap Profit, is objectionable or which restricts or inhibits \
any other person from using or enjoying the Service, or which may expose Swap Profit \
or its users to any harm or liability of any type;',

'-- interfere with or disrupt the Service or servers or networks connected to the Service, or \
disobey any requirements, procedures, policies or regulations of networks connected to \
the Service; or',

'-- violate any applicable local, state, national or international law, or any regulations \
having the force of law;',

'-- impersonate any person or entity, or falsely state or otherwise misrepresent your \
affiliation with a person or entity;',

'-- solicit personal information from anyone under the age of 18;',

'-- harvest or collect email addresses or other contact information of other users from the \
Service by electronic or other means for the purposes of sending unsolicited emails or \
other unsolicited communications;',

'-- advertise or offer to sell or buy any goods or services for any business purpose that is \
not specifically authorized;',

'-- further or promote any criminal activity or enterprise or provide instructional information \
about illegal activities; or',

'-- obtain or attempt to access or otherwise obtain any materials or information through any \
means not intentionally made available or provided for through the Service.',

'-- fail to pay on Swaps you have made; unless you have a valid reason as set out in a \
Swap Profit policy, for example, you cannot contact the seller (see our Swap Rating \
Policy);',

'-- manipulate the value of a Swap or interfere with any other user&#39;s listings;',

'-- take any action that may undermine our ratings systems;',

'-- use any robot, spider, scraper, data mining tools, data gathering and extraction tools, or \
other automated means to access our Services for any purpose, except with the prior \
express permission of Swap Profit;',

'-- interfere with the working of our Services, or impose an unreasonable or \
disproportionately large load on our infrastructure;',

'-- export or re-export any Swap Profit application or tool, except in compliance with the \
export control laws of any relevant jurisdictions and in accordance with posted rules and \
restrictions;',

'-- harvest or otherwise collect information about users without their consent; or circumvent \
any technical measures used to provide the Services.',

'If we believe you are abusing Swap Profit and/or our Services in any way, we may, in \
our sole discretion and without limiting other remedies, limit, suspend, or terminate your \
user account(s) and access to our Services, delay or remove hosted content, remove \
any special status associated with your account(s), remove, not display, and/or demote \
listings, reduce or eliminate any discounts, and take technical and/or legal steps to \
prevent you from using our Services.',

'We may cancel unconfirmed accounts or accounts that have been inactive for a long \
time. Additionally, we reserve the right to refuse, modify, or terminate all or part of our \
Services to anyone for any reason at our discretion.',

'Special Notice for International Use; Export Controls: Software (defined below) available \
in connection with the Service and the transmission of applicable data, if any, is subject \
to United States export controls. No Software may be downloaded from the Service or \
otherwise exported or re-exported in violation of U.S. export laws. Downloading or using \
the Software is at your sole risk. Recognizing the global nature of the Internet, you \
agree to comply with all local rules and laws regarding your use of the Service, including \
as it concerns online conduct and acceptable content.',

'Commercial Use: The Service is for your personal use. Unless otherwise expressly \
authorized herein or in the Service, you agree not to display, distribute, license, perform, \
publish, reproduce, duplicate, copy, create derivative works from, modify, sell, resell, \
exploit, transfer or upload for any commercial purposes, any portion of the Service, use \
of the Service, or access to the Service.',

'Apple-Enabled Software Applications',
'Swap Profit offers Software applications that are intended to be operated in connection \
with products made commercially available by Apple Inc. (“Apple”), among other \
platforms. With respect to Software that is made available for your use in connection \
with an Apple-branded product (such Software, “Apple-Enabled Software”), in addition \
to the other terms and conditions set forth in these Terms of Service, the following terms \
and conditions apply:',

'Swap Profit and you acknowledge that these Terms of Service are concluded between \
Swap Profit and you only, and not with Apple, and that as between Swap Profit and \
Apple, Swap Profit, not Apple, is solely responsible for the Apple-Enabled Software and \
the content thereof.',

'You may not use the Apple-Enabled Software in any manner that is in violation of or \
inconsistent with the Usage Rules set forth for Apple-Enabled Software in, or otherwise \
be in conflict with, the App Store Terms of Service.',

'Your license to use the Apple-Enabled Software is limited to a non-transferable license \
to use the Apple-Enabled Software on an iOS Product that you own or control, as \
permitted by the Usage Rules set forth in the App Store Terms of Service.',

'Apple has no obligation whatsoever to provide any maintenance or support services \
with respect to the Apple-Enabled Software.',

'Apple is not responsible for any product warranties, whether express or implied by law. \
In the event of any failure of the Apple-Enabled Software to conform to any applicable \
warranty, you may notify Apple, and Apple will refund the purchase price for the Apple- \
Enabled Software to you, if any; and, to the maximum extent permitted by applicable \
law, Apple will have no other warranty obligation whatsoever with respect to the Apple- \
Enabled Software, or any other claims, losses, liabilities, damages, costs or expenses \
attributable to any failure to conform to any warranty, which will be Swap Profit’s sole \
responsibility, to the extent it cannot be disclaimed under applicable law.',

'Swap Profit and you acknowledge that Swap Profit, not Apple, is responsible for \
addressing any claims of you or any third party relating to the Apple-Enabled Software \
or your possession and/or use of that Apple-Enabled Software, including, but not limited \
to: (i) product liability claims; (ii) any claim that the Apple-Enabled Software fails to \
conform to any applicable legal or regulatory requirement; and (iii) claims arising under \
consumer protection or similar legislation.',

'In the event of any third party claim that the Apple-Enabled Software or the end-user’s \
possession and use of that Apple-Enabled Software infringes that third party’s \
intellectual property rights, as between Swap Profit and Apple, Swap Profit, not Apple, \
will be solely responsible for the investigation, defense, settlement and discharge of any \
such intellectual property infringement claim.',

'You represent and warrant that (i) you are not located in a country that is subject to a \
U.S. Government embargo, or that has been designated by the U.S. Government as a \
“terrorist supporting” country; and (ii) you are not listed on any U.S. Government list of \
prohibited or restricted parties.',

'If you have any questions, complaints or claims with respect to the Apple-Enabled \
Software, they should be directed to Swap Profit as follows:',

'support@swapprofitonline.com',

'Swap Profit, LLC. \
700 Executive Center Drive #29 \
West Palm Beach, FL 33401',

'Swap Profit and you acknowledge and agree that Apple, and Apple’s subsidiaries, are \
third party beneficiaries of these Terms of Service with respect to the Apple-Enabled \
Software, and that, upon your acceptance of the terms and conditions of these Terms of \
Service, Apple will have the right (and will be deemed to have accepted the right) to \
enforce these Terms of Service against you with respect to the Apple-Enabled Software \
as a third party beneficiary thereof.',

'Intellectual Property Rights',
'Service Content, Software and Trademarks: You acknowledge and agree that the \
Service may contain content or features (“Service Content”) that are protected by \
copyright, patent, trademark, trade secret or other proprietary rights and laws. Except as \
expressly authorized by Swap Profit, you agree not to modify, copy, frame, scrape, rent, \
lease, loan, sell, distribute or create derivative works based on the Service or the \
Service Content, in whole or in part, except that the foregoing does not apply to your \
own User Content (as defined below) that you legally upload to the Service. In \
connection with your use of the Service you will not engage in or use any data mining, \
robots, scraping or similar data gathering or extraction methods. If you are blocked by \
Swap Profit from accessing the Service (including by blocking your IP address), you \
agree not to implement any measures to circumvent such blocking (e.g., by masking \
your IP address or using a proxy IP address). Any use of the Service or the Service \
Content other than as specifically authorized herein is strictly prohibited. The technology \
and software underlying the Service or distributed in connection therewith are the \
property of Swap Profit, our affiliates and our partners (the “Software”). You agree not to \
copy, modify, create a derivative work of, reverse engineer, reverse assemble or \
otherwise attempt to discover any source code, sell, assign, sublicense, or otherwise \
transfer any right in the Software. Any rights not expressly granted herein are reserved \
by Swap Profit.',

'The Swap Profit name and logos are trademarks and service marks of Swap Profit \
(collectively the “Swap Profit Trademarks”). Other Swap Profit, product, and service \
names and logos used and displayed via the Service may be trademarks or service \
marks of their respective owners who may or may not endorse or be affiliated with or \
connected to Swap Profit. Nothing in this Terms of Service or the Service should be \
construed as granting, by implication, estoppel, or otherwise, any license or right to use \
any of Swap Profit Trademarks displayed on the Service, without our prior written \
permission in each instance. All goodwill generated from the use of Swap Profit \
Trademarks will inure to our exclusive benefit.',

'Third Party Material: Under no circumstances will Swap Profit be liable in any way for \
any content or materials of any third parties (including users), including, but not limited \
to, for any errors or omissions in any content, or for any loss or damage of any kind \
incurred as a result of the use of any such content. You acknowledge that Swap Profit \
does not pre-screen content, but that Swap Profit and its designees will have the right \
(but not the obligation) in their sole discretion to refuse or remove any content that is \
available via the Service. Without limiting the foregoing, Swap Profit and its designees \
will have the right to remove any content that violates these Terms of Service or is \
deemed by Swap Profit, in its sole discretion, to be otherwise objectionable. You agree \
that you must evaluate, and bear all risks associated with, the use of any content, \
including any reliance on the accuracy, completeness, or usefulness of such content.',

'User Content Transmitted Through the Service: With respect to the content or other \
materials you upload through the Service or share with other users or recipients \
(collectively, “User Content”), you represent and warrant that you own all right, title and \
interest in and to such User Content, including, without limitation, all copyrights and \
rights of publicity contained therein. By uploading any User Content you hereby grant \
and will grant Swap Profit and its affiliated companies a nonexclusive, worldwide, \
royalty free, fully paid up, transferable, sublicensable, perpetual, irrevocable license to \
copy, display, upload, perform, distribute, store, modify and otherwise use your User \
Content in connection with the operation of the Service in any form, medium or \
technology now known or later developed.',

'You acknowledge and agree that any questions, comments, suggestions, ideas, \
feedback or other information about the Service (“Submissions”), provided by you to \
Swap Profit are non-confidential and Swap Profit will be entitled to the unrestricted use \
and dissemination of these Submissions for any purpose, commercial or otherwise, \
without acknowledgment or compensation to you.',

'You acknowledge and agree that Swap Profit may preserve content and may also \
disclose content if required to do so by law or in the good faith belief that such \
preservation or disclosure is reasonably necessary to: (a) comply with legal process, \
applicable laws or government requests; (b) enforce these Terms of Service; (c) \
respond to claims that any content violates the rights of third parties; or (d) protect the \
rights, property, or personal safety of Swap Profit, its users and the public. You \
understand that the technical processing and transmission of the Service, including your \
content, may involve (a) transmissions over various networks; and (b) changes to \
conform and adapt to technical requirements of connecting networks or devices.',

'Third Party Websites',
'The Service may provide, or third parties may provide, links or other access to other \
sites and resources on the Internet. Swap Profit has no control over such sites and \
resources and Swap Profit is not responsible for and does not endorse such sites and \
resources. You further acknowledge and agree that Swap Profit will not be responsible \
or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by \
or in connection with use of or reliance on any content, events, goods or services \
available on or through any such site or resource. Any dealings you have with third \
parties found while using the Service are between you and the third party, and you \
agree that Swap Profit is not liable for any loss or claim that you may have against any \
such third party.',

'Social Networking Services',
'You may enable or log in to the Service via various online third-party services, such as \
social media and social networking services like Google, Facebook or Twitter (“Social \
Networking Services”). By logging in or directly integrating these Social Networking \
Services into the Service, we make your online experiences richer and more \
personalized. To take advantage of this feature and capabilities, we may ask you to \
authenticate, register for or log into Social Networking Services on the websites of their \
respective providers. As part of such integration, the Social Networking Services will \
provide us with access to certain information that you have provided to such Social \
Networking Services, and we will use, store and disclose such information in \
accordance with our Privacy Policy. For more information about the implications of \
activating these Social Networking Services and Swap Profit’s use, storage and \
disclosure of information related to you and your use of such services within Swap Profit \
(including your friend lists and the like), please see our Privacy Policy at \
www.swapprofitonline.com/privacy. However, please remember that the manner in \
which Social Networking Services use, store and disclose your information is governed \
solely by the policies of such third parties, and Swap Profit shall have no liability or \
responsibility for the privacy practices or other actions of any third party site or service \
that may be enabled within the Service.',

'In addition, Swap Profit is not responsible for the accuracy, availability or reliability of \
any information, content, goods, data, opinions, advice or statements made available in \
connection with Social Networking Services. As such, Swap Profit is not liable for any \
damage or loss caused or alleged to be caused by or in connection with use of or \
reliance on any such Social Networking Services. Swap Profit enables these features \
merely as a convenience and the integration or inclusion of such features does not \
imply an endorsement or recommendation.',

'Indemnity and Release',
'You agree to release, indemnify and hold Swap Profit and its affiliates and their officers, \
employees, directors and agents (collectively, “Indemnitees”) harmless from any from \
any and all losses, damages, expenses, including reasonable attorneys’ fees, rights, \
claims, actions of any kind and injury (including death) arising out of or relating to your \
use of the Service, any User Content, your connection to the Service, your violation of \
these Terms of Service or your violation of any rights of another. Notwithstanding the \
foregoing, you will have no obligation to indemnify or hold harmless any Indemnitee \
from or against any liability, losses, damages or expenses incurred as a result of any \
action or inaction of such Indemnitee. If you are a California resident, you waive \
California Civil Code Section 1542, which says: “A general release does not extend to \
claims which the creditor does not know or suspect to exist in his favor at the time of \
executing the release, which if known by him must have materially affected his \
settlement with the debtor.” If you are a resident of another jurisdiction, you waive any \
comparable statute or doctrine.',

'Disclaimer of Warranties',

'YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS \
PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. SWAP PROFIT \
EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS,',

'IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO THE IMPLIED \
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, \
TITLE AND NON-INFRINGEMENT.',

'SWAP PROFIT MAKES NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR \
REQUIREMENTS, (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, \
SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM \
THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE \
QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL \
PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR \
EXPECTATIONS.',

'Limitation of Liability',
'YOU EXPRESSLY UNDERSTAND AND AGREE THAT SWAP PROFIT WILL NOT BE \
LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, \
EXEMPLARY DAMAGES, OR DAMAGES FOR LOSS OF PROFITS INCLUDING BUT \
NOT LIMITED TO, DAMAGES FOR LOSS OF GOODWILL, USE, DATA OR OTHER \
INTANGIBLE LOSSES (EVEN IF SWAP PROFIT HAS BEEN ADVISED OF THE \
POSSIBILITY OF SUCH DAMAGES), WHETHER BASED ON CONTRACT, TORT, \
NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, RESULTING FROM: (I) THE \
USE OR THE INABILITY TO USE THE SERVICE; (II) THE COST OF PROCUREMENT \
OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, \
INFORMATION OR SERVICES PURCHASED OR OBTAINED OR MESSAGES \
RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE \
SERVICE; (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR \
TRANSMISSIONS OR DATA; (IV) STATEMENTS OR CONDUCT OF ANY THIRD \
PARTY ON THE SERVICE; OR (V) ANY OTHER MATTER RELATING TO THE \
SERVICE. IN NO EVENT WILL SWAP PROFIT’S TOTAL LIABILITY TO YOU FOR ALL \
DAMAGES, LOSSES OR CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE \
PAID SWAP PROFIT IN THE LAST SIX (6) MONTHS, OR, IF GREATER, ONE \
HUNDRED DOLLARS ($100).',

'SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OR EXCLUSION OF \
CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR \
INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE \
ABOVE LIMITATIONS SET FORTH ABOVE MAY NOT APPLY TO YOU OR BE \
ENFORCEABLE WITH RESPECT TO YOU. IF YOU ARE DISSATISFIED WITH ANY \
PORTION OF THE SERVICE OR WITH THESE TERMS OF SERVICE, YOUR SOLE \
AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE SERVICE.',

'IF YOU ARE A USER FROM NEW JERSEY, THE FOREGOING SECTIONS TITLED \
“DISCLAIMER OF WARRANTIES” AND “LIMITATION OF LIABILITY” ARE INTENDED \
TO BE ONLY AS BROAD AS IS PERMITTED UNDER THE LAWS OF THE STATE OF \
NEW JERSEY. IF ANY PORTION OF THESE SECTIONS IS HELD TO BE INVALID \
UNDER THE LAWS OF THE STATE OF NEW JERSEY, THE INVALIDITY OF SUCH \
PORTION SHALL NOT AFFECT THE VALIDITY OF THE REMAINING PORTIONS OF \
THE APPLICABLE SECTIONS.',

'Dispute Resolution by Binding Arbitration: PLEASE READ THIS SECTION \
CAREFULLY AS IT AFFECTS YOUR RIGHTS.',

'Agreement to Arbitrate',
'This Dispute Resolution by Binding Arbitration section is referred to in this Terms of \
Service as the “Arbitration Agreement.” You agree that any and all disputes or claims \
that have arisen or may arise between you and Swap Profit, whether arising out of or \
relating to this Terms of Service (including any alleged breach thereof), the Services, \
any advertising, any aspect of the relationship or transactions between us, shall be \
resolved exclusively through final and binding arbitration, rather than a court, in \
accordance with the terms of this Arbitration Agreement, except that you may assert \
individual claims in small claims court, if your claims qualify. Further, this Arbitration \
Agreement does not preclude you from bringing issues to the attention of federal, state, \
or local agencies, and such agencies can, if the law allows, seek relief against us on \
your behalf. You agree that, by entering into this Terms of Service, you and Swap Profit \
are each waiving the right to a trial by jury or to participate in a class action. Your rights \
will be determined by a neutral arbitrator, not a judge or jury. The Federal Arbitration Act \
governs the interpretation and enforcement of this Arbitration Agreement.',

'Prohibition of Class and Representative Actions and Non-Individualized Relief',
'YOU AND SWAP PROFIT AGREE THAT EACH OF US MAY BRING CLAIMS \
AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF \
OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION \
OR PROCEEDING. UNLESS BOTH YOU AND SWAP PROFIT AGREE OTHERWISE, \
THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE \
PERSON’S OR PARTY’S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER \
ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING. \
ALSO, THE ARBITRATOR MAY AWARD RELIEF (INCLUDING MONETARY, \
INJUNCTIVE, AND DECLARATORY RELIEF) ONLY IN FAVOR OF THE INDIVIDUAL \
PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE \
RELIEF NECESSITATED BY THAT PARTY’S INDIVIDUAL CLAIM(S).',

'Pre-Arbitration Dispute Resolution',
'Swap Profit is always interested in resolving disputes amicably and efficiently, and most \
customer concerns can be resolved quickly and to the customer’s satisfaction by \
emailing customer support support@swapprofitonline.com. If such efforts prove \
unsuccessful, a party who intends to seek arbitration must first send to the other, by \
certified mail, a written Notice of Dispute (“Notice”). The Notice to Swap Profit should be \
sent to Swap Profit, LLC, 700 Executive Drive #29, West Palm Beach, FL 33401 \
(“Notice Address”). The Notice must (i) describe the nature and basis of the claim or \
dispute and (ii) set forth the specific relief sought. If Swap Profit and you do not resolve \
the claim within sixty (60) calendar days after the Notice is received, you or Swap Profit \
may commence an arbitration proceeding. During the arbitration, the amount of any \
settlement offer made by Swap Profit or you shall not be disclosed to the arbitrator until \
after the arbitrator determines the amount, if any, to which you or Swap Profit is entitled.',

'Arbitration Procedures',
'Arbitration will be conducted by a neutral arbitrator in accordance with the American \
Arbitration Association’s (“AAA”) rules and procedures, including the AAA’s \
Supplementary Procedures for Consumer-Related Disputes (collectively, the “AAA \
Rules”), as modified by this Arbitration Agreement. For information on the AAA, please \
visit its website, http://www.adr.org. Information about the AAA Rules and fees for \
consumer disputes can be found at the AAA’s consumer arbitration page, \
http://www.adr.org/consumer_arbitration. If there is any inconsistency between any term \
of the AAA Rules and any term of this Arbitration Agreement, the applicable terms of \
this Arbitration Agreement will control unless the arbitrator determines that the \
application of the inconsistent Arbitration Agreement terms would not result in a \
fundamentally fair arbitration. The arbitrator must also follow the provisions of these \
Terms of Service as a court would. All issues are for the arbitrator to decide, including, \
but not limited to, issues relating to the scope, enforceability, and arbitrability of this \
Arbitration Agreement. Although arbitration proceedings are usually simpler and more \
streamlined than trials and other judicial proceedings, the arbitrator can award the same \
damages and relief on an individual basis that a court can award to an individual under \
the Terms of Service and applicable law. Decisions by the arbitrator are enforceable in \
court and may be overturned by a court only for very limited reasons.',

'Unless Swap Profit and you agree otherwise, any arbitration hearings will take place in \
a reasonably convenient location for both parties with due consideration of their ability \
to travel and other pertinent circumstances. If the parties are unable to agree on a \
location, the determination shall be made by AAA. If your claim is for $10,000 or less, \
Swap Profit agrees that you may choose whether the arbitration will be conducted solely \
on the basis of documents submitted to the arbitrator, through a telephonic hearing, or \
by an in-person hearing as established by the AAA Rules. If your claim exceeds \
$10,000, the right to a hearing will be determined by the AAA Rules. Regardless of the \
manner in which the arbitration is conducted, the arbitrator shall issue a reasoned \
written decision sufficient to explain the essential findings and conclusions on which the \
award is based.',

'Costs of Arbitration',
'Payment of all filing, administration, and arbitrator fees (collectively, the “Arbitration \
Fees”) will be governed by the AAA Rules, unless otherwise provided in this Arbitration \
Agreement. If the value of the relief sought is $75,000 or less, at your request, Swap \
Profit will pay all Arbitration Fees. If the value of relief sought is more than $75,000 and \
you are able to demonstrate to the arbitrator that you are economically unable to pay \
your portion of the Arbitration Fees or if the arbitrator otherwise determines for any \
reason that you should not be required to pay your portion of the Arbitration Fees, Swap \
Profit will pay your portion of such fees. In addition, if you demonstrate to the arbitrator \
that the costs of arbitration will be prohibitive as compared to the costs of litigation, \
Swap Profit will pay as much of the Arbitration Fees as the arbitrator deems necessary \
to prevent the arbitration from being cost-prohibitive. Any payment of attorneys’ fees will \
be governed by the AAA Rules.',

'Confidentiality',

'All aspects of the arbitration proceeding, and any ruling, decision, or award by the \
arbitrator, will be strictly confidential for the benefit of all parties.',

'Severability',

'If a court or the arbitrator decides that any term or provision of this Arbitration \
Agreement (other than the subsection (b) titled “Prohibition of Class and Representative \
Actions and Non-Individualized Relief” above) is invalid or unenforceable, the parties \
agree to replace such term or provision with a term or provision that is valid and \
enforceable and that comes closest to expressing the intention of the invalid or \
unenforceable term or provision, and this Arbitration Agreement shall be enforceable as \
so modified. If a court or the arbitrator decides that any of the provisions of subsection \
(b) above titled “Prohibition of Class and Representative Actions and Non-Individualized \
Relief” are invalid or unenforceable, then the entirety of this Arbitration Agreement shall \
be null and void. The remainder of the Terms of Service will continue to apply.',

'Future Changes to Arbitration Agreement',
'Notwithstanding any provision in this Terms of Service to the contrary, Swap Profit \
agrees that if it makes any future change to this Arbitration Agreement (other than a \
change to the Notice Address) while you are a user of the Services, you may reject any \
such change by sending Swap Profit written notice within thirty (30) calendar days of the \
change to the Notice Address provided above. By rejecting any future change, you are \
agreeing that you will arbitrate any dispute between us in accordance with the language \
of this Arbitration Agreement as of the date you first accepted these Terms of Service \
(or accepted any subsequent changes to these Terms of Service).',

'Termination',
'You agree that Swap Profit, in its sole discretion, may suspend or terminate your \
account (or any part thereof) or use of the Service and remove and discard any content \
within the Service, for any reason, including, without limitation, for lack of use or if Swap \
Profit believes that you have violated or acted inconsistently with the letter or spirit of \
these Terms of Service. Any suspected fraudulent, abusive or illegal activity that may be \
grounds for termination of your use of Service, may be referred to appropriate law \
enforcement authorities. Swap Profit may also in its sole discretion and at any time \
discontinue providing the Service, or any part thereof, with or without notice. You agree \
that any termination of your access to the Service under any provision of this Terms of \
Service may be effected without prior notice, and acknowledge and agree that Swap \
Profit may immediately deactivate or delete your account and all related information and \
files in your account and/or bar any further access to such files or the Service. Further, \
you agree that Swap Profit will not be liable to you or any third party for any termination \
of your access to the Service.',

'User Disputes',
'You agree that you are solely responsible for your interactions with any other user in \
connection with the Service and Swap Profit will have no liability or responsibility with \
respect thereto. Swap Profit reserves the right, but has no obligation, to become \
involved in any way with disputes between you and any other user of the Service.',

'General',
'These Terms of Service constitute the entire agreement between you and Swap Profit \
and govern your use of the Service, superseding any prior agreements between you \
and Swap Profit with respect to the Service. You also may be subject to additional terms \
and conditions that may apply when you use affiliate or third-party services, third party \
content or third-party software. These Terms of Service will be governed by the laws of \
the State of Florida. With respect to any disputes or claims not subject to arbitration, as \
set forth above, you and Swap Profit agree to submit to the personal and exclusive \
jurisdiction of the state and federal courts located within Broward County, Florida. The \
failure of Swap Profit to exercise or enforce any right or provision of these Terms of \
Service will not constitute a waiver of such right or provision. If any provision of these \
Terms of Service is found by a court of competent jurisdiction to be invalid, the parties \
nevertheless agree that the court should endeavor to give effect to the parties’, \
intentions as reflected in the provision, and the other provisions of these Terms of \
Service remain in full force and effect. You agree that regardless of any statute or law to \
the contrary, any claim or cause of action arising out of or related to use of the Service \
or these Terms of Service must be filed within one (1) year after such claim or cause of \
action arose or be forever barred. A printed version of this agreement and of any notice \
given in electronic form will be admissible in judicial or administrative proceedings \
based upon or relating to this agreement to the same extent and subject to the same \
conditions as other business documents and records originally generated and \
maintained in printed form. You may not assign this Terms of Service without the prior \
written consent of Swap Profit, but Swap Profit may assign or transfer this Terms of \
Service, in whole or in part, without restriction. The section titles in these Terms of \
Service are for convenience only and have no legal or contractual effect. Notices to you \
may be made via either email or regular mail. The Service may also provide notices to \
you of changes to these Terms of Service or other matters by displaying notices or links \
to notices generally on the Service.',

'Your Privacy:',

'At Swap Profit, we respect the privacy of our users. For details please see our Privacy \
Policy. By using the Service, you consent to our collection and use of personal data as \
outlined therein.',

'Notice for California Users',
'Under California Civil Code Section 1789.3, users of the Service from California are \
entitled to the following specific consumer rights notice: The Complaint Assistance Unit \
of the Division of Consumer Services of the California Department of Consumer Affairs \
may be contacted in writing at 1625 North Market Blvd., Suite N 112, Sacramento, CA \
95834, or by telephone at (916) 445-1254 or (800) 952-5210.'
]