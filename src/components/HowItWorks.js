import './how-it-works.css'
import { useState } from 'react';
import ContentBox from '../common/ContentBox';

const HowItWorks = ()=> { 
    const [activeTab, setActiveTab] = useState('buyer');

    const clickHandler = (tab) => {
        setActiveTab(tab);
    };

    console.log('how it works reloaded with ', activeTab, ' state')
    return (  
        <>
            <h2 className='heading'>How It Works</h2>
            <div className='toggle-btns '>
                <button onClick={()=>clickHandler('buyer') } className={activeTab === 'buyer' ? 'active' : ''}>Buyer</button>
                <button onClick={()=> clickHandler('seller') } className={activeTab === 'seller' ? 'active' : ''}>Seller</button>
            </div>

            <div className='content-container'>
      {/* first row */}
            <div>
                <ContentBox
                    header={activeTab === 'seller' ? 'Setup Your Seller Account' : 'Setup Your Buyer Account'}
                    iconNumber={'1'}
                    content={activeTab === 'seller' ? 'Provide accurate and complete information to create your seller account.' : 'Enter your details accurately to create your buyer account.'}
                />
                <ContentBox
                    header={'Select Order Information'}
                    iconNumber={'2'}
                    content={'Choose the desired martial, weight, and availability for your order.'}
                />
            </div>

            {/* second row */}
            <div>
                <ContentBox
                    header={'Submit Your Order'}
                    iconNumber={'3'}
                    content={activeTab === 'seller' ?  "Personalize your order by selecting specific details such as martial type, weight, and your preferred pickup date." : 'Customize your order by selecting specific details such as martial type, weight, and availability. Ensure a seamless experience by allowing location permissions to accurately process your order.' }
                />
                <ContentBox
                    header={activeTab === 'seller' ? 'Earn Points' :  'Receive Your Car and Collect Your Order'}
                    iconNumber={'4'}
                    content={activeTab === 'seller' ?  'Visit our stock to collect your materials. Our team will assist you in locating and packaging your items' : 'Every order you place earns you reward points! Accumulate points with each purchase and redeem them for exciting rewards . Your points balance will be updated automatically after each successful transaction.'}
                />
            </div>

                
            </div>
        </>
    )
}

export default HowItWorks
