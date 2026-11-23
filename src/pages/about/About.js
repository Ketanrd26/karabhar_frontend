import React, { useState } from "react";
import "./About.scss";
import Footer from "../../components/footer/Footer";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import Pagetop from "../../components/pageTop/Pagetop";
import { Helmet } from "react-helmet";

const About = () => {
  const [faqIndex, setFaqIndex] = useState();

  const faq = [
    {
      faq_heading: "What is Jungle Boosh?",
      faq_para:
        "Jungle Boosh is a platform that connects honest creators and small producers with people who value authentic, thoughtfully made products. Many of the makers on our platform are home producers, farmers, or small traditional businesses who focus on quality but often don’t have access to online markets. Jungle Boosh helps bring their work directly to your doorstep.",
    },
    {
      faq_heading: "How is Jungle Boosh different from other online stores?",
      faq_para:
        "Most online stores focus on large-scale products. Jungle Boosh focuses on small creators and traditional makers. Every product has a story, a person behind it, and a process that values quality and authenticity over mass production. ",
    },
    {
      faq_heading: "Who makes the products sold on Jungle Boosh?",
      faq_para:
        "The products are made by independent creators, home producers, small family businesses, farmers, and traditional artisans from different regions. We work closely with them to ensure quality and authenticity.",
    },
    {
      faq_heading: "Are the products handmade or small-batch?",
      faq_para:
        "Many of the products on Jungle Boosh are handmade or made in small batches. Because of this, they may feel more personal and sometimes even slightly different from batch to batch — which is part of their authenticity.",
    },
    {
      faq_heading: "How can I contact Jungle Boosh?",
      faq_para:
        "If you have any questions or need assistance, you can contact us through the contact page on our website or email our support team.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          About JungleBoosh | Organic, Natural & Handmade Products in India
        </title>
        <meta
          name="description"
          content="Learn about Jungle Boosh – a curated online store supporting Indian farmers, artisans and local creators. We offer organic foods, natural soaps, groceries and eco-friendly products with trust and quality."
        />

        <meta name="robots" content="index, follow" />

        {/* Open Graph for Facebook & WhatsApp */}
        <meta property="og:title" content="About JungleBoosh" />
        <meta
          property="og:description"
          content="Organic, natural and handmade products supporting Indian creators."
        />
        <meta property="og:type" content="website" />

        <meta
          name="keywords"
          content="Jungle Boosh, organic products India, natural soaps, handmade products, eco friendly store, Indian artisans, organic groceries"
        />
      </Helmet>

      <Pagetop
        heading="About Karobhar"
        para="Karobhar, a brand by Wave Solutions, empowers small businesses, local entrepreneurs, and emerging brands to showcase their products and reach more customers. Our mission is to turn local businesses into growing opportunities by connecting products, people, and possibilities on one platform."
      />

      <div className="about_parent parent">
        <div className="about_cont cont">
          <div className="ab_left bg-img-cover"></div>
          <div className="ab_right">
            <h3>The Story Behind Karobhar</h3>
            <p>
              Karobhar, a brand by Wave Solutions, is a curated online
              marketplace built to help small businesses, local entrepreneurs,
              and emerging brands reach customers digitally. We help businesses
              showcase their products, build their identity, and grow through
              online opportunities.
            </p>
            <p>
              Many talented entrepreneurs across India create amazing products
              but lack access to technology, branding, or online marketplaces.
              Karobhar exists to bridge that gap — giving small businesses a
              platform to grow without losing their individuality or the story
              behind their products.
            </p>

            <p>
              Our role is simple: connect businesses with customers, make
              products accessible, and create opportunities for growth. From
              local makers to emerging brands, every business on Karobhar
              represents passion, hard work, and the ambition to grow.
            </p>
            <p>
              We believe that when small businesses get the right platform,
              support, and visibility, they can turn small beginnings into big
              opportunities. Karobhar is built to make that growth possible.
            </p>
          </div>
        </div>
      </div>

      <div className="faq_parent parent">
        <div className="faq_cont cont">
          <h3> Have questions? We're happy to answer them! </h3>

          {faq.map((item, index) => (
            <div
              className={faqIndex === index ? "faq_list active" : "faq_list"}
            >
              <h4 className="faq_heading" onClick={() => setFaqIndex(index)}>
                <span> {item.faq_heading} </span>
                <span>
                  {" "}
                  {faqIndex === index ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  )}{" "}
                </span>
              </h4>
              <p className="faq_para">{item.faq_para}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
