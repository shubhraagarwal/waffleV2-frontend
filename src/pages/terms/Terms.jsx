import React from 'react';
import './Terms.scss';

import NavigationBar from '../../components/navigationbar/NavigationBar';
import waffle1 from '../../assets/community1-mirror.png';
import waffle2 from '../../assets/community2.png';
const Terms = () => {
  const data = [
    {
      question: '1. Introduction',
      answer: (
        <p>
          Thank you so much for visiting our terms and conditions and if you
          have any questions feel free to reach out to us in Discord or on
          Twitter. We have many things in the future for those who are involved
          in our movement and project! We are not done with our roadmap. Any
          updates will be recorded on our Changelog page.
        </p>
      ),
    },
    {
      question: '2. Definitions',
      answer: (
        <p>
          Odd Waffle refers to the original collection of 8,888 randomly
          generated 3D avatars. <br />
          <br /> “Odd Waffle NFT” is defined as any individual art, design, 2D
          drawings or 3D models that may be associated with an Odd Waffle NFT
          that you Own.
          <br />
          <br /> “Own” is defined as possession of an Odd Waffle NFT in your
          Ethereum wallet, where proof of such possession is recorded on the
          blockchain.
          <br />
          <br /> "Rig/Image/Model" are defined as individual
          VXR/VXA/VXM/VOX/GLTF/GLB/OBJ Models, PNG/GIF/JPEG and underlying files
          containing all proprietary Odd Waffle traits.
          <br />
          <br /> "Traits" are defined as the distinguishing characteristics and
          proprietary individually layered art files associated with each Odd
          Waffle NFT. These includes but is not limited to Face, Headwear, Body,
          Clothing, Background.
        </p>
      ),
    },
    {
      question: '3. What We Own',
      answer: (
        <p>
          The name and Intellectual Property involved in the project Odd Waffles
          is owned by our team from Woodstock Labs. All rights that are not
          specifically granted to the users and owners of Odd Waffles below are
          reserved by the team or potential future DAO. This includes but is not
          limited to the intellectual property rights surrounding the Odd
          Waffles names, logos, 3D layer files, trademarks, the website, the
          look and feel of the user interface, the smart contract code, or
          anything else not specifically granted by any following licenses.
        </p>
      ),
    },
    {
      question: '4. You Own Your Odd Waffle NFT',
      answer: (
        <p>
          By holding an Odd Waffle in your Ethereum wallet, you gain full and
          complete ownership of your NFT as well as the opportunity to utilize
          this NFT in minting or receiving subsequent opportunities available
          only to Odd Waffle holders.
          <br />
          <br /> All NFTs ownership is verified cryptographically on the
          Ethereum Blockchain. This is proof of ownership and grants rights
          within this document. Once the NFT leaves ownership, all Personal and
          Commercial use terms are revoked.
        </p>
      ),
    },
    {
      question: '5. Personal Use',
      answer: (
        <p>
          Subject to compliance with these terms, Woodstock Labs grants you a
          royalty-free license to use, copy, display, and modify the Odd Waffle
          that you own for Odd Waffle art. This usage is granted worldwide.
          <br />
          <br /> This usage is for the limited purposes of:
          <br />
          <br /> Personal and Non-Commercial Use <br /> Display and usage of
          your NFT on External Websites <br /> Ability and Buy, Sell, and Trade
          your NFT
        </p>
      ),
    },
    {
      question: '6. Commercial and Derivative Rights',
      answer: (
        <p>
          We appreciate your desire to utilize Odd Waffles in various commercial
          ways, and we are open to you doing just that! When it comes to
          limiting commercial rights, however, we want you as an NFT holder to
          realize that you must use the Odd Waffle in its entirety!
          <br />
          <br /> Use of the Odd Waffle NFT Licensed Materials must be in full
          and in their entirety. Licensed use of Odd Waffle must include the
          complete Rig/Image/Model and rights are reserved for all underlying
          image files including layered files for individual proprietary Odd
          Waffle traits or the individual proprietary VOX and VXM files that
          complete each asset. These rights are reserved for the Team and are
          expressly prohibited to be used outside of the full Rig/Image/Model.
          These individual layered files are proprietary and of Odd Waffle's
          creation.
          <br />
          <br /> Odd Waffles expressly prohibits the use of any proprietary,
          individual traits or crafted layers in any other Odd Waffles. Odd
          Waffles also prohibits the sale or promotion of counterfeit NFTs or
          NFT collections. Counterfeit NFTs or collections contain art that is
          identical to or substantially indistinguishable from the original Odd
          Waffle collection, including:
          <br />
          <br /> NFTs are described as knock off, replica, imitation, clone,
          faux, fake, mirror image, or similar terms when referring to an NFT or
          NFT Collection in an attempt to pass themselves off as genuine Odd
          Waffle creations.
          <br />
          <br /> Non-genuine products that mimic Odd Waffle features or
          proprietary traits in an attempt to pass themselves off as genuine Odd
          Waffle creations.
          <br />
          <br /> Otherwise, you are free to use your Odd Waffle in the fullest
          sense of commercial and derivative use cases.
          <br />
          <br /> However, the user shall not use any Odd Waffle Licensed
          Materials in any way, or in connection with any material, which is
          unlawful, fraudulent, libellous, defamatory, obscene, pornographic,
          profane, threatening, abusive, hateful, offensive or otherwise
          objectionable or unreasonable or infringing upon any laws or
          regulations or intellectual property rights or proprietary rights or
          confidentiality obligations and you shall indemnify and defend Odd
          Waffles against any claims, damages, proceedings, loss or costs
          arising from such use. User shall not use the Odd Waffle Licensed
          Materials in any way that could be construed as being adverse or
          derogatory to the image of Odd Waffles or any of its subjects.
        </p>
      ),
    },
    {
      question: '7. Future Projects',
      answer: (
        <p>
          By holding an Odd Waffle NFT, you will have the opportunity to
          participate in a variety of future opportunities, including but not
          limited to Odd Waffle Gen 2 mint reservation, airdrops, access to
          events in real-life events and The Sandbox, Cryptovoxels, etc.
        </p>
      ),
    },
    {
      question: '8. Odd Waffle are NOT investment vehicles',
      answer: (
        <p>
          Odd Waffles are collectable digital art pieces that also function as a
          fun, Non-Fungible Tokens for you to collect. They were created as art
          pieces intended for people to enjoy by collecting, not as a financial
          instrument. Odd Waffle makes no promises or guarantees regarding the
          value of Odd Waffle NFTs aside from the one that we will strive to do
          the best for the project and the community.
        </p>
      ),
    },
    {
      question: '9. Taxes',
      answer: (
        <p>
          You are entirely and solely responsible for any tax liability which
          may arise from minting, selling or owning your Odd Waffle NFTs.
        </p>
      ),
    },
  ];
  return (
    <div>
      <NavigationBar />
      <div className='container-fluid terms py-5'>
        <div className='container'>
          <div className='row title'>
            <div className='col-6 col-md-3 order-1 order-md-0'>
              <img src={waffle1} alt='waffle' className='img-fluid' />
            </div>
            <div className='col-12 col-md-6 order-0 order-md-1'>
              <h1>Terms & Condition</h1>
            </div>
            <div className='col-6 col-md-3 order-2 order-md-2'>
              <img src={waffle2} alt='waffle' className='img-fluid' />
            </div>
          </div>
          <div className='content-container'>
            {data.map(({ question, answer }, index) => (
              <div
                key={index}
                data-aos='fade-in'
                data-aos-duration='1000'
                data-aos-offset='50'
              >
                <h3>{question}</h3>
                {answer}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
