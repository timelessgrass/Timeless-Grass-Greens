import type { Guide } from './guides.types';
export type { Guide } from './guides.types';

/**
 * The nine regulatory guides.
 *
 * Written from cached research, then remediated against an adversarial audit that
 * found uncited statutory claims, a miscounted provider total, a cross-page
 * contradiction about an unreachable source, and an unverifiable NXDOMAIN claim.
 * The remediation rule was: when in doubt, cut. A shorter true page beats a longer
 * sourced-looking one.
 *
 * Audit trail: archive/guides/{draft-v1,audit-v1,final-v2,reaudit-v2}.*
 */
export const GUIDES: Guide[] = [
  {
    "answer": {
      "question": "Where can artificial turf be used in Colorado?",
      "answer": "Colorado does not have one blanket rule banning every artificial lawn. Its landscape restrictions distinguish covered property and functional use. Identify whether the project is a private yard, common area, commercial site or covered multifamily property, then confirm the applicable local requirements before choosing the surface."
    },
    "description": "Colorado’s turf restrictions depend on the property and intended use. Identify the site, purpose and local requirements before finalizing a project.",
    "faq": [],
    "h1": "Where can artificial turf be used in Colorado?",
    "market": "denver-metro",
    "sections": [
      {
        "h2": "Identify the property and the purpose",
        "body": [
          "The state landscape law targets nonfunctional artificial turf in covered new or redeveloped landscapes. Covered categories include commercial, institutional, industrial and association common property. A private single-family yard is treated differently under this law, but still needs any applicable local and community requirements checked.",
          "Functional uses named in the law include playgrounds, sports fields and golf-related playing areas such as putting and chipping greens. Describe the real intended use in the plan. Calling a decorative area a putting green does not establish that it qualifies.",
          "If the proposal involves multifamily housing, a special district or common land, ask the local reviewer which provisions and implementation dates apply. Obtain an answer for the actual ownership, use and scope."
        ]
      },
      {
        "h2": "Check the whole proposal before construction",
        "body": [
          "Include the area being changed, any existing turf, grading and drainage work, and the proposed materials. Do not assume replacing an older surface is automatically treated like maintaining it, or that a state exception answers every local requirement.",
          "The state law allows more stringent local provisions. Ask the municipality and any relevant district what adopted requirements apply to the plan, then keep the response with the estimate.",
          "Association approval and funding are separate questions. The <a href=\"/guides/colorado-hoa-turf-rules/\">Colorado HOA guide</a> covers private-yard submissions, and the <a href=\"/guides/colorado-water-rebates-and-turf/\">rebate guide</a> explains why approval to install does not establish incentive eligibility."
        ]
      },
      {
        "h2": "Your project checklist",
        "body": [
          "<ul><li>Address, ownership and property type.</li><li>The area being changed and intended activity.</li><li>New work, replacement or broader redevelopment scope.</li><li>Applicable municipality and district requirements.</li><li>Any association conditions and material documentation.</li><li>Written responses reflected in the installation price.</li></ul>",
          "Bring the confirmed requirements and intended use to a free TIMELESS visit. The layout and turf options can then be discussed against the actual project conditions."
        ]
      }
    ],
    "slug": "colorado-turf-law",
    "sources": [
      {
        "label": "Colorado HB25-1113, signed act (2025)",
        "cite": "Section 3 amends C.R.S. 37-99-103(1) to insert NONFUNCTIONAL before \"artificial turf\"; adds 37-99-102(6.5) definition of functional artificial turf naming driving range, chipping and putting green, tee box, green, fairway and rough; adds (12.5) nonfunctional artificial turf; adds (1.5) applicable residential real property (more than twelve dwelling units); adds 37-99-103(5) and 37-99-104(1).",
        "url": "https://content.leg.colorado.gov/sites/default/files/2025a_1113_signed.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado SB24-005, signed act (2024)",
        "cite": "Creates Title 37 Article 99. Original 37-99-103(1) prohibition on \"nonfunctional turf, artificial turf, or invasive plant species\" from 1 January 2026; 37-99-102(1) applicable property and the express exclusion of residential property; 37-99-102(5) common interest community property; 37-99-102(14) redevelopment project and the fifty percent aggregate landscape area trigger; 37-99-103(4)(a) grandfathering of pre-2026 installations; 37-99-103(4)(d) more-stringent local authority; 37-99-102(9) local entity includes special and metropolitan districts; 37-99-102(17) definition of turf.",
        "url": "https://content.leg.colorado.gov/sites/default/files/2024a_005_signed.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado General Assembly — HB25-1113 bill page",
        "cite": "Signed 20 May 2025, effective 6 August 2025, Chapter 221; the 2026 and 2028 compliance dates.",
        "url": "https://leg.colorado.gov/bills/hb25-1113",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado General Assembly — SB24-005 bill page",
        "cite": "Official summary and effective date 7 August 2024; state-facility restriction from 1 January 2025; athletic fields of play exemption.",
        "url": "https://leg.colorado.gov/bills/sb24-005",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado Division of Real Estate — 2025 HOA Forum legislative summaries",
        "cite": "States the twelve-plus-unit expansion applies \"on or after January 1, 2026\" — one side of the multifamily-date conflict reported on this page.",
        "url": "https://dre.colorado.gov/sites/dre/files/documents/2025-07-25%20HOA%20Forum%202025%20Legislative%20Summaries.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Western Resource Advocates — SB24-005 simplified compliance guide",
        "cite": "Reads the multifamily obligation as 1 January 2028; states that only the disturbed portion of landscaping on redeveloped parcels must conform.",
        "url": "https://westernresourceadvocates.org/wp-content/uploads/2025/08/2025_SB24-005_Simplified-Guide.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Town of Fraser — staff report on local compliance with SB24-005 and HB25-1113",
        "cite": "Municipal implementation reading the multifamily obligation as 1 January 2028; an example of a local entity adopting a conforming code text amendment.",
        "url": "https://www.frasercolorado.com/AgendaCenter/ViewFile/Item/7839?fileID=10590",
        "checked": "2026-09-08"
      },
      {
        "label": "Colorado SB23-178, signed act (2023)",
        "cite": "Adds C.R.S. 38-33.3-106.5(1)(i.5) for detached single-family units: guidelines must not prohibit nonvegetative turf grass in the backyard; 45-day written notice to cure and a remedy of the greater of five hundred dollars or actual damages; associations may restrict nonvegetative turf grass to rear yards only.",
        "url": "https://content.leg.colorado.gov/sites/default/files/2023a_178_signed.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado HB21-1229, signed act (2021)",
        "cite": "Inserted \"nonvegetative turf grass\" into C.R.S. 38-33.3-106.5(1)(i) and C.R.S. 37-60-126(11)(a), making a covenant that prohibits it in a residential back yard contrary to public policy and unenforceable.",
        "url": "https://content.leg.colorado.gov/sites/default/files/2021a_1229_signed.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "C.R.S. 37-60-126, current text",
        "cite": "Subsection (11)(b) defines turf, turf grass and xeriscape but does not define \"nonvegetative turf grass\"; (11)(d)(I) provides the subsection does not supersede municipal subdivision regulation.",
        "url": "https://codes.findlaw.com/co/title-37-water-and-irrigation/co-rev-st-sect-37-60-126/",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado Water Conservation Board — Turf Replacement Program",
        "cite": "C.R.S. 37-60-135 bars grant money from being used to replace turf with artificial turf; CWCB \"is no longer accepting applications\" as of March 2025; single-family homeowners and HOAs were never eligible applicants; water-wise landscaping cross-reference at 37-60-135(2)(l).",
        "url": "https://cwcb.colorado.gov/turf-replacement-program",
        "checked": "2026-09-07"
      }
    ],
    "title": "Colorado Artificial Turf Rules | TIMELESS Grass & Greens",
    "updated": "2026-09-11",
    "publicReferences": [
      "https://content.leg.colorado.gov/sites/default/files/2025a_1113_signed.pdf",
      "https://content.leg.colorado.gov/sites/default/files/2024a_005_signed.pdf"
    ]
  },
  {
    "slug": "nc-vs-sc-built-upon-area",
    "title": "Grand Strand Turf & Lot Coverage | TIMELESS Grass & Greens",
    "description": "North Carolina and South Carolina turf proposals need different coverage checks. Confirm the parcel, complete installation and any water-adjacent requirements.",
    "h1": "Turf and lot coverage on both sides of the Grand Strand",
    "market": "grand-strand",
    "updated": "2026-09-11",
    "answer": {
      "question": "Turf and lot coverage on both sides of the Grand Strand",
      "answer": "On the North Carolina side, qualifying turf can be excluded from built-upon area for state and local stormwater programs. On the South Carolina side, obtain the applicable city or county determination. In either case, the surface classification does not settle every construction or water-adjacent requirement."
    },
    "sections": [
      {
        "h2": "First confirm which office covers the parcel",
        "body": [
          "A mailing town name is not enough to identify the reviewing office. Give staff the address and parcel information, particularly near a municipal or state boundary. The <a href=\"/grand-strand/shallotte-nc/\">Shallotte installation page</a> explains the town-jurisdiction check.",
          "Send the same complete proposal to the appropriate office: the turf area, product, base and drainage details, plus any other excavation or grading. A response about one part of the work should not be treated as a determination for everything else."
        ]
      },
      {
        "h2": "Use the right coverage question",
        "body": [
          "North Carolina’s statutory exclusion applies to turf made to drain through its backing and installed to manufacturer specifications over a pervious surface. Ask staff how the documented assembly meets those conditions. Do not turn the exclusion into a blanket construction exemption.",
          "For an unincorporated Horry County parcel, ask County Stormwater to review the complete scope, including any exemption request. Inside a city, use that city’s requirements. North Myrtle Beach has written pervious-surface criteria; a neighboring jurisdiction’s answer is not a substitute for its review.",
          "If the work is close to a creek, shoreline, pond, ditch or other drainage feature, identify it on the plan and ask whether additional requirements apply. The coverage answer alone does not establish permission to build in that location."
        ]
      },
      {
        "h2": "Cross-border project checklist",
        "body": [
          "<ul><li>Confirm the parcel’s jurisdiction.</li><li>Show the complete product and base assembly.</li><li>Describe excavation, grading and the route for water.</li><li>Identify nearby water or drainage features.</li><li>Keep the written classification and review requirements with the estimate.</li></ul>",
          "The broader <a href=\"/guides/is-artificial-turf-impervious/\">impervious-surface guide</a> provides the document checklist for all three installation markets."
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "label": "N.C.G.S. 143-214.7D, Stormwater runoff rules and programs",
        "cite": "Subsection (b)(6) excludes from built-upon area \"Artificial turf, manufactured to allow water to drain through the backing of the turf, and installed according to the manufacturer's specifications over a pervious surface\"; (b)(3) excludes #57 stone at least four inches thick over geotextile fabric; (c) permits an owner to opt out; (d) bars a local government from enacting, implementing or enforcing an ordinance, comprehensive plan or stormwater program with a definition of built-upon area or impervious surface that does not comply with subsection (b).",
        "url": "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_143/GS_143-214.7D.html",
        "checked": "2026-09-07"
      },
      {
        "label": "WithersRavenel — Comparative Analysis of Synthetic Turf and Natural Grass, 29 April 2026",
        "cite": "Quotes N.C.G.S. 143-214.7D(b)(6) and dates SB 166 as effective September 2024, retroactive to July 2023; states the change let permitting agencies treat synthetic fields much like natural grass fields for stormwater.",
        "url": "https://withersravenel.com/news/comparative-analysis-of-synthetic-turf-and-natural-grass/",
        "checked": "2026-09-07"
      },
      {
        "label": "Horry County Code of Ordinances, Sec. 17.7-16 (stormwater utility definitions)",
        "cite": "\"Common impervious surfaces include, but are not limited to, rooftops, sidewalks, walkways, patio areas, driveways, parking lots, storage areas, compacted gravel and soil surfaces, awnings and other fabric or plastic coverings...\" Artificial turf is not named. Code current through 12 August 2026.",
        "url": "https://library.municode.com/sc/horry_county/codes/code_of_ordinances?nodeId=COOR_CH17.7STMA_ARTIISTUTFE_S17.7-16DE",
        "checked": "2026-09-07"
      },
      {
        "label": "Horry County: current stormwater permitting guidance",
        "cite": "The page gives inconsistent land-disturbance thresholds and describes staff review of exemption claims. Ask the county to determine the applicable requirements for the full project scope.",
        "url": "https://www.horrycountysc.gov/departments/stormwater/engineers/construction/storm-water-permitting/",
        "checked": "2026-09-11"
      },
      {
        "label": "Horry County Stormwater Management Design Manual, January 2024",
        "cite": "Historical manual source. Current county permitting guidance checked on 11 September 2026 contains inconsistent thresholds and describes staff review of exemption claims. Confirm the requirements for the actual proposal; this archived source is not a blanket backyard exemption.",
        "url": "https://www.horrycountysc.gov/media/4wqkxbxg/horry-county-sw-design-manual_rev2024.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "City of Myrtle Beach Code, Zoning Appendix A Sec. 203 (definitions)",
        "cite": "Impervious Surface is measured against \"the rate of absorption of vegetations-bearing soils\"; the impervious lot coverage list expressly includes \"stone, shell or gravel surfacing.\" Artificial turf is not named. Code current through 16 February 2026.",
        "url": "https://library.municode.com/sc/myrtle_beach/codes/code_of_ordinances?nodeId=COOR_APXAZO_ART2DE_S203DE",
        "checked": "2026-09-07"
      },
      {
        "label": "City of North Myrtle Beach Code, Sec. 23-129.4 (Ord. No. 25-45, adopted 6 October 2025)",
        "cite": "To be considered pervious, a material or system must demonstrate a minimum infiltration rate of two inches per hour based on manufacturer testing or accepted industry standards, be installed to manufacturer spec, pass inspection and be maintained; \"If these criteria are not met, the surface will be considered impervious, regardless of material type or labeling.\" Applies to single-family and duplex residences not subject to site-specific development plan review. Code current through 23 July 2026.",
        "url": "https://library.municode.com/sc/north_myrtle_beach/codes/code_of_ordinances?nodeId=COOR_CH23ZO_ARTVIIGESURE_S23-129.4STPESUIMSUSIMIDURENOSUSIECDEPLRE",
        "checked": "2026-09-07"
      },
      {
        "label": "Brunswick County Unified Development Ordinance (revised through 19 August 2024)",
        "cite": "The Impervious Surface definition names compacted earth, gravel, concrete, asphalt and building footprints, and treats porous pavement, uncovered wooden slatted decks and pool water area as pervious. Full-text search of the 491-page UDO returns no occurrence of artificial turf or synthetic turf. Sec. 4.8.7.E Water Quality Protection Overlay limits built-upon impervious area to 25 percent of the lot.",
        "url": "https://www.brunswickcountync.gov/DocumentCenter/View/5460",
        "checked": "2026-09-07"
      },
      {
        "label": "Brunswick County Stormwater Quality Management and Discharge Control Ordinance",
        "cite": "Section 1.5(d) defines built-upon area with the pre-2024 exclusion list — slatted wood deck, pool water area, #57 stone at least four inches thick over geotextile fabric, trails under G.S. 113A-85 — and does not list artificial turf.",
        "url": "https://www.brunswickcountync.gov/DocumentCenter/View/7215",
        "checked": "2026-09-07"
      },
      {
        "label": "Town of Shallotte Unified Development Ordinance, amendments through April 2026 (PDF dated 24 March 2026)",
        "cite": "The Impervious Surface definition at (126) does not mention artificial turf; the Built-upon Area definition covers \"buildings, pavement, gravel roads, and recreation facilities.\" Sec. 25-15(B) requires a Town stormwater permit for all non-residential development and for any activity disturbing one acre or 10,000 sq ft of impervious surfaces.",
        "url": "https://www.townofshallotte.org/vertical/sites/%7B84A9E943-E9D6-4534-99F0-B6F654F25036%7D/uploads/2026-03-24_Shallotte_UDO_(1).pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Town of Sunset Beach Unified Development Ordinance",
        "cite": "The Impervious Surface definition lists #57 stone and qualifying trails as pervious but not artificial turf, and admits \"Alternative materials, not subject to the definition of impervious surface... subject to certification of a licensed and certified North Carolina professional engineer of compliance with the hydraulic conductivity standard of 1.41 inches per hour or greater... in the form of a letter under seal.\" Sec. 2.12(B) and 2.13(B)-(C) require a zoning permit for any increase in impervious square footage and a stormwater management plan where impervious coverage increases by more than 200 square feet, with an as-built survey stating impervious percentages. Residential development is capped at 45 percent impervious of total lot area, and 20 percent in CR-1, CR-2 and AF-1.",
        "url": "https://rebuild-sunsetbeachnc.govoffice2.com/vertical/Sites/%7BC59DF5BC-1B90-44CB-AD2A-9DAE0D811CD0%7D/uploads/2023_ToSB_UDO_(Working_Copy)_Full.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "15A NCAC 02H .1002 and .1019 — North Carolina coastal stormwater rule",
        "cite": ".1002(6) names Brunswick among the 20 statutory coastal counties. .1019 sets the low-density maximum built-upon area at 12 percent near SA waters and freshwater ORW and 24 percent for other coastal county waters; above that a project is high density and must treat the 1.5-inch storm, or the one-year 24-hour storm near SA waters.",
        "url": "http://reports.oah.state.nc.us/ncac/title%2015a%20-%20environmental%20quality/chapter%2002%20-%20environmental%20management/subchapter%20h/subchapter%20h%20rules.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "15A NCAC 07H .0209 — Coastal Shorelines AEC use standards",
        "cite": "(a) estuarine shorelines AEC extend 75 feet landward of normal high water or normal water level, 575 feet where immediately contiguous to Outstanding Resource Waters, and public trust shorelines 30 feet. (d)(2) \"Impervious surfaces shall not exceed 30 percent of the AEC area of the lot, unless the applicant can demonstrate, through innovative design, that the protection provided by the design would be equal to or exceed the protection by the 30 percent limitation.\"",
        "url": "http://reports.oah.state.nc.us/ncac/title%2015a%20-%20environmental%20quality/chapter%2007%20-%20coastal%20management/subchapter%20h/subchapter%20h%20rules.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "N.C.G.S. 113A-103(5)a and 113A-118 — CAMA definition of development and permit requirement",
        "cite": "Development includes excavation, dredging, filling, dumping, removal of clay, silt, sand or gravel, and clearing or alteration of land as an adjunct of construction, when it occurs in a duly designated Area of Environmental Concern; a CAMA permit is required before undertaking it, in addition to any other State or local permit.",
        "url": "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_113A/GS_113A-103.html",
        "checked": "2026-09-07"
      },
      {
        "label": "Coastal Review — \"Coastal Resources Commission digs in on artificial turf,\" September 2021",
        "cite": "The Coastal Resources Commission voted 10-1 to prohibit artificial turf within the 30-foot coastal shoreline buffer.",
        "url": "https://coastalreview.org/2021/09/coastal-resources-commission-digs-in-on-artificial-turf/",
        "checked": "2026-09-07"
      },
      {
        "label": "Research gap — Georgetown County, South Carolina and Columbus County, North Carolina",
        "cite": "Neither county's impervious-surface or stormwater provisions were researched. Murrells Inlet is in Georgetown County, not Horry, and is a separate permitting jurisdiction with its own codes and fees. No claim is made on this page about how Georgetown County or Columbus County treats artificial turf.",
        "checked": "2026-09-07"
      }
    ],
    "publicReferences": [
      "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_143/GS_143-214.7D.html",
      "https://www.horrycountysc.gov/departments/stormwater/engineers/construction/storm-water-permitting/",
      "https://library.municode.com/sc/north_myrtle_beach/codes/code_of_ordinances?nodeId=COOR_CH23ZO_ARTVIIGESURE_S23-129.4STPESUIMSUSIMIDURENOSUSIECDEPLRE"
    ]
  },
  {
    "slug": "no-turf-rebates-grand-strand",
    "title": "Grand Strand Turf Rebates | TIMELESS Grass & Greens",
    "description": "Verify the provider and written eligibility before budgeting a turf incentive. Separate rebates, water savings and stormwater charges for the actual property.",
    "h1": "How to check a Grand Strand artificial turf rebate claim",
    "market": "grand-strand",
    "updated": "2026-09-11",
    "answer": {
      "question": "How to check a Grand Strand artificial turf rebate claim",
      "answer": "Budget the installation without an assumed rebate until a current program confirms the address, applicant and synthetic-turf proposal qualify. A conservation page, expected water saving or stormwater credit is not the same as a payment toward installation. Ask for the program’s written terms before work begins."
    },
    "sections": [
      {
        "h2": "Start with the provider on the bill",
        "body": [
          "Use the water provider for the actual property, including on the North Carolina side of the service area. Ask about synthetic turf explicitly and identify whether you are applying as a household, association or business.",
          "For a GSWSA account, its <a href=\"https://www.gswsa.com/Community.cfm?page=35\" target=\"_blank\" rel=\"nofollow noopener\">water-conservation information</a> is a useful starting contact. Ask for the current program terms if an incentive is mentioned. A general conservation recommendation does not confirm a turf payment.",
          "Keep the written answer with the quote. Check funding, application dates and any approval needed before existing grass is removed or materials are purchased."
        ]
      },
      {
        "h2": "Keep the different financial questions separate",
        "body": [
          "A rebate helps fund specified work. A change in water use affects future bills. A stormwater charge or credit follows a separate set of property rules. Establish each one independently instead of using a projected saving to imply an installation subsidy.",
          "Compare water use with your own bills and planned care. Turf removes irrigation for grass growth in the converted area, but pet cleaning and rinsing can still use water. A savings figure from a dry western climate is not a calculation for a Grand Strand yard.",
          "If someone proposes a stormwater credit, ask the relevant office to confirm qualification and the required documentation. The <a href=\"/guides/is-artificial-turf-impervious/\">lot-coverage guide</a> explains the separate classification question."
        ]
      },
      {
        "h2": "A rebate-verification checklist",
        "body": [
          "<ul><li>Current program name and written terms.</li><li>The correct provider, address and applicant type.</li><li>Explicit eligibility for the proposed artificial turf.</li><li>Required approval and application dates.</li><li>Confirmed payment calculation and available funding.</li><li>Any inspection or completion records needed.</li></ul>",
          "Ask for the full installation price first and show any confirmed incentive separately. If the program cannot confirm the proposal, leave the incentive out of the final budget."
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "label": "Grand Strand Water & Sewer Authority — Water Conservation / Smart Irrigation pages",
        "cite": "No rebate, incentive or irrigation-meter program is listed. Research also searched the Horry County, Myrtle Beach and North Myrtle Beach codes and found no water-conservation rebate or landscape-conversion incentive provisions; the only \"rebate\" hits were tax-increment-financing and procurement-ethics provisions.",
        "url": "https://www.gswsa.com/Community.cfm?page=35",
        "checked": "2026-09-07"
      },
      {
        "label": "GSWSA drought management policy update, effective July 1, 2026",
        "cite": "\"excess charges will begin after 6,000 gallons of usage\" (down from 8,000); \"Any irrigation use should occur outside the hours of 6:00 – 9:00 a.m.\"; standing Smart Irrigation guidance to \"Skip Irrigating on Mondays\" and to water by house number (odd Tue/Thu/Sat, even Wed/Fri/Sun). Triggered by the South Carolina State Climatology Office declaring severe drought for the Pee Dee River Basin (Horry, Marion, Dillon counties).",
        "url": "https://www.gswsa.com/News.cfm?id=88",
        "checked": "2026-09-07"
      },
      {
        "label": "City of Myrtle Beach Code, Chapter 21, Article VI — Drought Management and Response",
        "cite": "Four drought alert phases adopted under the South Carolina Drought Response Act of 2000 (SC Code Sec. 49-23-10 et seq.). At the severe phase the city imposes \"mandatory restrictions on non-essential usage and restrictions on times when certain water usage is allowed,\" targeting a 20% reduction. Conway (Title 4, Chapter 4) and North Myrtle Beach (Secs. 15-93/15-94) have parallel ordinances.",
        "url": "https://library.municode.com/sc/myrtle_beach/codes/code_of_ordinances?nodeId=COOR_CH21UT_ARTVIDRMAPLRE",
        "checked": "2026-09-07"
      },
      {
        "label": "Horry County Code Sec. 17.7-16 — definition of impervious surface",
        "cite": "\"Common impervious surfaces include, but are not limited to, rooftops, sidewalks, walkways, patio areas, driveways, parking lots, storage areas, compacted gravel and soil surfaces, awnings and other fabric or plastic coverings, and other surfaces which prevent or impede the natural infiltration of stormwater runoff which existed prior to development.\" Artificial turf is not named anywhere in the code.",
        "url": "https://library.municode.com/sc/horry_county/codes/code_of_ordinances?nodeId=COOR_CH17.7STMA_ARTIISTUTFE_S17.7-16DE",
        "checked": "2026-09-07"
      },
      {
        "label": "Horry County Code Sec. 17.7-17 and Sec. 17.7-18 — stormwater service charge and credit",
        "cite": "Development intensity factors of 0.95 (90–100% impervious) down to 0.01 (under 1%), billed per 20,000 sq ft of land area, minimum charge $0.75/month. Sec. 17.7-18 authorizes a credit for on-site detention or retention per the county's stormwater utility service charge credit manual, which we could not obtain; horrycountysc.gov refused connections during research.",
        "url": "https://library.municode.com/sc/horry_county/codes/code_of_ordinances?nodeId=COOR_CH17.7STMA_ARTIISTUTFE_S17.7-17STSECHRA",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado Water Conservation Board — Turf Replacement Program, C.R.S. 37-60-135 (HB22-1151)",
        "cite": "Applicants \"shall not use the money to replace turf with any of the following: (a) impermeable concrete; (b) artificial turf; (c) water features such as fountains; (d) invasive plant species; or (e) turf.\" CWCB stopped accepting applications in March 2025.",
        "url": "https://cwcb.colorado.gov/turf-replacement-program",
        "checked": "2026-09-07"
      },
      {
        "label": "Denver Water — Landscape Transformation Assistance Program, HOA and commercial eligibility",
        "cite": "Under \"What Denver Water will NOT fund for HOAs/Commercial Projects\": \"Designs that include artificial turf, landscape fabrics/weed barriers or hardscapes. These do not benefit the environment.\"",
        "url": "https://www.denverwater.org/business/rebates-and-conservation-tips/landscape-transformation-assistance-program/hoa-commercial",
        "checked": "2026-09-07"
      },
      {
        "label": "Aurora Water — GRIP Residential Manual 2026",
        "cite": "$3.00 per square foot for a water-wise landscape, $0.50 for low-water grasses. \"The landscape must include a minimum of 50% living plant material coverage… (i.e. grass cannot be replaced with just rocks, artificial turf, etc.)\" and, in the prohibited list, \"X Artificial turf.\"",
        "url": "https://www.auroragov.org/UserFiles/Servers/Server_1881137/File/Residents/Water/Water%20Conservation/Landscape%20rebate/GRIP_Residential_Manual_2026_web_accessible.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Castle Rock Water — ColoradoScape Renovation Rebate",
        "cite": "$3.25 per square foot for replacement with low-water ColoradoScape. The page states, for both the residential and non-residential programs: \"Artificial turf does not qualify for any part of the rebate.\"",
        "url": "https://crconserve.com/153/Rebates",
        "checked": "2026-09-07"
      },
      {
        "label": "Centennial Water & Sanitation District (Highlands Ranch Water) — Turf Replacement Program",
        "cite": "\"Artificial turf replacements are no longer eligible for rebate. We apologize for any inconvenience. $2.50/sq. ft. for ColoradoScape… $1.50/sq. ft. for low-water use turf: Dog Tuff, Tahoma 31.\"",
        "url": "https://www.centennialwater.org/turf-replacement-program",
        "checked": "2026-09-07"
      },
      {
        "label": "Town of Erie — 2026 Turf Replacement Rebate Program",
        "cite": "$2 per square foot for low-water garden plantings, $1 for low-water grasses, with living plant material required across 70% of the project area. The requirements section opens: \"Artificial Turf is not eligible for this rebate.\"",
        "url": "https://www.erieco.gov/1962/2026-Turf-Replacement-Rebate-Program",
        "checked": "2026-09-07"
      },
      {
        "label": "Thornton Water — 2026 Artificial Turf Rules for Water-Wise Landscape Rebate",
        "cite": "\"The residential water-wise landscape rebate provides up to $2 per square foot for qualifying 200 – 1,000 square feet projects. The rebate has a lifetime maximum of $2,000 per residential lot.\" Conditions include a Minor Development Permit before installation, a minimum eight-year warranty against fading, backing that drains at a minimum of two inches per hour, PFAS-free documentation, a three-inch compacted aggregate sub-base, and glued rather than sewn seams.",
        "url": "https://www.thorntonwater.com/wp-content/uploads/2026/02/2026-residential_artificial_turf_info__rules-1.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Resource Central — lawn replacement program, administrator for 30+ Front Range water providers",
        "cite": "\"10 Gallons of Water Saved Per Square Foot of Lawn Converted Annually.\" Eligibility rule governing all partner providers: \"Project areas must be at least 200 square feet and replaced with at least 50% waterwise plants.\"",
        "url": "https://resourcecentral.org/lawn/",
        "checked": "2026-09-07"
      },
      {
        "label": "NOAA 1991–2020 climate normals for Myrtle Beach, as tabulated on Wikipedia (secondary source, flagged as such)",
        "cite": "53.56 inches of precipitation per year; wettest months September (6.77 in), July (6.61 in) and August (6.27 in).",
        "url": "https://en.wikipedia.org/wiki/Myrtle_Beach,_South_Carolina",
        "checked": "2026-09-07"
      }
    ],
    "publicReferences": [
      "https://www.gswsa.com/Community.cfm?page=35"
    ]
  },
  {
    "slug": "florida-turf-infill-rules",
    "title": "Florida Turf Materials & Infill | TIMELESS Grass & Greens",
    "description": "Check Florida’s residential turf standard against the property and selected system. Keep material documentation, drainage and private requirements in the proposal.",
    "h1": "Which turf and infill requirements apply to a Florida home?",
    "market": "northeast-florida",
    "updated": "2026-09-11",
    "answer": {
      "question": "Which turf and infill requirements apply to a Florida home?",
      "answer": "Florida’s synthetic-turf standard covers single-family residential properties of one acre or less. Within that scope it addresses the materials and installation, including infill. Confirm the property type and the exact product system before relying on the standard, and check public project requirements and private agreements separately."
    },
    "sections": [
      {
        "h2": "Match the proposed materials to the rule",
        "body": [
          "Where the rule applies, infill, if used, is limited to clean silica sand, rock, shell or other natural material, with coated silica sand allowed when its coating is non-toxic. Rubber and other synthetic infill are limited to the footprint of playground equipment. That exception does not itself establish that a proposed playground surface provides the needed fall protection.",
          "The rule also addresses heavy metals and intentionally added PFAS. Ask for documentation for the exact turf, backing, infill and any other proposed component. A product described as pet-friendly or designed for Florida still needs its material information checked.",
          "For a mineral or coated product, obtain its full description and confirm how it meets the applicable requirements. Do not assume a marketing category settles the material classification."
        ]
      },
      {
        "h2": "Include the complete installation",
        "body": [
          "The standard addresses permeability through the turf, backing and base, preparation of the material beneath the turf, anchoring and keeping infill on the property. Have the proposal explain how the actual installation addresses those requirements.",
          "Identify existing puddles, downspouts and drainage features before finalizing the layout. A drainable product does not establish that the ground below will handle water at the same rate. The <a href=\"/blog/does-rain-drain-through-artificial-turf/\">drainage article</a> explains what to ask.",
          "Material compliance also does not remove care and heat concerns. Pet areas need cleanup, and exposed turf can become hot. Include those practical needs when selecting the footprint."
        ]
      },
      {
        "h2": "Check the property scope and approvals",
        "body": [
          "Condominiums, duplexes, athletic fields and commercial properties are outside this residential rule’s stated scope. Ask which requirements apply to the actual project rather than using the home-lawn standard as a general approval.",
          "The standard does not address HOA requirements, deed restrictions or other private agreements. Local project reviews also need their own inquiry. The <a href=\"/guides/florida-friendly-landscaping-and-hoas/\">Florida HOA guide</a> covers those distinctions."
        ]
      },
      {
        "h2": "Your material and installation checklist",
        "body": [
          "<ul><li>Property type and lot size.</li><li>Exact turf, backing and infill information.</li><li>Documentation supporting relevant material claims.</li><li>Base, drainage, seams and edge details.</li><li>Any public reviews and private conditions.</li><li>Care instructions for the supplied system.</li></ul>",
          "Keep those details with the written installation price. Ask for the applicable rule text and product documentation to resolve a material question before ordering."
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "label": "Rule 62-308.100, F.A.C. — adopted rule text, Florida Administrative Code",
        "cite": "\"Infill material, if used, shall only be clean silica sand, rock, shell, or other natural material, except that coated silica sand may be used provided that any coating used is non-toxic... Rubber or any other synthetic infill material is allowed only within the footprint of playground equipment... Installation shall be designed to prevent washing away of any infill material off the residential property.\" Also (2)(a) heavy metals and intentionally added PFAS prohibited; (2)(b) disposable at a Chapter 62-701, F.A.C. permitted landfill; (2)(d) washed subgrade; (4) permeability and no compaction of soil beneath subgrade; (9)(b) anchoring at all edges and seams. History–New 5-19-26.",
        "url": "https://www.flrules.org/gateway/readFile.asp?sid=0&tid=30839130&type=1&file=62-308.100.doc",
        "checked": "2026-09-08"
      },
      {
        "label": "Florida Administrative Code rule record — 62-308.100 \"Synthetic Turf\"",
        "cite": "Chapter 62-308, \"Minimum Standards for the Installation of Synthetic Turf on Specified Properties\". Effective Date: 5/19/2026. History note \"History–New 5-19-26\". Rulemaking Authority and Law Implemented: 125.572 FS.",
        "url": "https://www.flrules.org/gateway/ruleNo.asp?id=62-308.100",
        "checked": "2026-09-08"
      },
      {
        "label": "Florida DEP — \"Minimum Standards for the Installation of Synthetic Turf\" Frequently Asked Questions",
        "cite": "\"This rule only applies to single-family residential properties that are 1 acre or less in size.\" \"DEP does not issue permits or require authorization for the installation of synthetic turf.\" \"No. DEP is not implementing a permitting, inspection or enforcement program under this rule.\" \"No. This rule does not address HOA requirements, deed restrictions or other private property agreements.\"",
        "url": "https://floridadep.gov/sites/default/files/SyntheticTurfFAQ%20final.pdf",
        "checked": "2026-09-08"
      },
      {
        "label": "Notice of Change, Rule 62-308.100 (Florida Administrative Register)",
        "cite": "Records \"(2) No change\" and \"(4) through (9) No change\" against the proposed rule published in Florida Administrative Register Vol. 52 No. 12, 20 January 2026 — the material-type and infill paragraphs reached adoption as proposed.",
        "url": "https://www.flrules.org/gateway/notice_Files.asp?ID=30651144",
        "checked": "2026-09-08"
      },
      {
        "label": "Section 125.572, Florida Statutes — Regulation of synthetic turf",
        "cite": "Created by HB 683 (2025), ch. 2025-140. Subsection (3)(a) bars a local government from adopting or enforcing any ordinance, resolution, order, rule or policy that prohibits a property owner from installing synthetic turf \"that complies with Department of Environmental Protection standards adopted pursuant to this section\" on single-family residential property, once DEP adopts rules under subsection (4).",
        "url": "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=0100-0199%2F0125%2FSections%2F0125.572.html",
        "checked": "2026-09-07"
      },
      {
        "label": "Singh, Peterson, Jay & Stevens (2024), PRISMA systematic review of 23 studies, International Journal of Biometeorology 68:1235-1252",
        "cite": "Petrass et al.: SBR crumb rubber infill 53.5°C vs TPE 45.6°C (p<0.001). Villacañas et al.: SBR 61.2°C ± 6.5 vs TPE 58.0°C ± 5.0 (p<0.001). Sand/organic infill plot 48.1°C. Pfautsch et al.: 30 mm fibers 57.5°C in sun vs 32.2°C in shade (maxima 80.1°C and 42.1°C). Albedo 6.9% synthetic vs 12.6% natural grass; latent heat flux 113 W/m² ± 3.0 over natural grass vs 58 W/m² ± 1.2 over synthetic. Air temperature only 0.5-1.2°C higher over synthetic; WBGT differences not significant. HydroChill turf 67.0°C ± 10.7 vs natural grass 33.3°C ± 1.1; \"cool climate\" fibers 40.1°C ± 12.8 vs natural grass 27.6°C ± 7.4.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11272752/",
        "checked": "2026-09-07"
      },
      {
        "label": "Williams & Pulley, Brigham Young University — full-day infrared surface temperature measurements on adjacent synthetic and natural fields",
        "cite": "7:00 AM to 7:00 PM averages: synthetic soccer surface 117.38°F (high 157°F), natural turf 78.19°F (high 88.5°F), asphalt 109.62°F, concrete 94.08°F. Hottest reading 200°F on a 98°F day. Irrigation dropped the synthetic surface from 174°F to 85°F; after five minutes it was 120°F and after twenty minutes 164°F.",
        "url": "https://www.westcoastturf.com/getdoc.cfm?id=38",
        "checked": "2026-09-07"
      },
      {
        "label": "McNitt, Petrunak & Serensits, Penn State University — irrigation and synthetic turf surface temperature",
        "cite": "Mixing 20% calcined clay into crumb rubber infill to hold moisture \"did not reduce surface temperature\"; pre-dawn irrigation and covering plots with a white tarp \"seems to have had little effect on the surface temperature of the synthetic turf later in the afternoon\".",
        "url": "https://plantscience.psu.edu/research/centers/ssrc/documents/temperature-irrigation.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Sports Health (2020) — laboratory study of MRSA survival in synthetic turf systems",
        "cite": "MRSA recoverable up to 96 hours on infill and 24 hours on fibers (p<0.001). Time to 50% loss of viability by infill: EPDM rubber 2 hours, cork-based 7, polymer-coated 9, crumb rubber 12, TPE rubber 13, sand 27 hours.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7222665/",
        "checked": "2026-09-07"
      },
      {
        "label": "USDA NRCS Soil Data Access (SSURGO) — drainage class and depth to water table, Nassau, Duval, Clay and St. Johns counties",
        "cite": "Poorly plus very poorly drained share of mapped acres (dominant condition): Duval 71.4%, St. Johns 78.5%, Nassau 82.2%. Shallowest annual depth to water table: 75.7% of mapped St. Johns acres reach within 0-15 cm (0-6 inches) of the surface at some point in the year.",
        "url": "https://sdmdataaccess.nrcs.usda.gov/",
        "checked": "2026-09-07"
      },
      {
        "label": "NOAA NCEI 1991-2020 climate normals, Jacksonville International Airport (USW00013889)",
        "cite": "Normal monthly precipitation June 7.60 in, July 6.77 in, August 6.88 in, September 7.56 in — roughly 28.8 inches across the four months, against 2.00-3.42 inches per month November through May.",
        "url": "https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-monthly-1991-2020&stations=USW00013889&dataTypes=MLY-TMAX-NORMAL,MLY-TMIN-NORMAL,MLY-PRCP-NORMAL&format=json",
        "checked": "2026-09-07"
      },
      {
        "label": "UF/IFAS Extension EP612 — Synthetic Turfgrass and the Nine Principles of Florida-Friendly Landscaping",
        "cite": "\"Because synthetic turf is not alive, it does not meet the criteria of a plant choice for an FFL landscape.\"",
        "url": "https://ask.ifas.ufl.edu/publication/EP612",
        "checked": "2026-09-07"
      },
      {
        "label": "The Motz Group — Jacksonville Jaguars Miller Electric Center practice facility",
        "cite": "The indoor field's turf system is made from coconut fiber and cork infill, reported to improve permeability and foot stability and to reduce surface temperatures by up to 40 degrees Fahrenheit. The two outdoor practice fields are natural grass.",
        "url": "https://themotzgroup.com/2022/10/17/a-customized-airpat-system-for-the-jacksonville-jaguars/",
        "checked": "2026-09-07"
      }
    ],
    "publicReferences": [
      "https://www.flrules.org/gateway/readFile.asp?sid=0&tid=30839130&type=1&file=62-308.100.doc",
      "https://floridadep.gov/sites/default/files/SyntheticTurfFAQ%20final.pdf"
    ]
  },
  {
    "answer": {
      "question": "How should you approach HOA approval for turf in Florida?",
      "answer": "Use the community’s current documents and the applicable law for the actual property. Florida-Friendly Landscaping protection is not a general artificial-turf approval. A separate HOA provision addresses turf through a visibility condition, while the state residential turf standard does not resolve private deed or association requirements."
    },
    "description": "Submit a defined turf proposal using the documents for your Florida property. Visibility, ownership and private agreements matter alongside the state turf standard.",
    "h1": "How should you approach HOA approval for turf in Florida?",
    "market": "northeast-florida",
    "sections": [
      {
        "h2": "Establish who reviews the change",
        "body": [
          "Confirm whether the area is part of your parcel or shared land and obtain the relevant declaration and architectural requirements. In a community with an HOA and a district, ask which body controls the proposed change and which documents it applies.",
          "Nocatee has separate neighborhood associations. Use the <a href=\"https://www.nocatee.com/homeowners-association-websites\" target=\"_blank\" rel=\"nofollow noopener\">neighborhood HOA directory</a> to identify the correct contact instead of treating one neighborhood’s answer as approval for another. Request the current documents for your own property.",
          "Prepare a layout showing the turf location and its surroundings, with product information and any grading or drainage changes. Include views from adjoining areas when visibility may matter."
        ]
      },
      {
        "h2": "Understand the separate protections",
        "body": [
          "Florida-Friendly Landscaping is a landscape approach grounded in its stated environmental and planting principles. Artificial turf does not qualify as a plant choice in that program. Do not present a turf proposal as automatically protected merely because it may reduce grass irrigation.",
          "The separate HOA provision at section 720.3045 expressly includes artificial turf and ties its protection to visibility from specified surrounding locations. A fence or a “backyard” label alone does not establish the condition. Assess the actual views and obtain advice if interpretation is disputed.",
          "The residential synthetic-turf standard concerns covered properties and installations; it does not address HOA requirements, deed restrictions or other private agreements. Use the <a href=\"/guides/florida-turf-infill-rules/\">material guide</a> for that standard’s scope, and keep the private review separate."
        ]
      },
      {
        "h2": "A clear written submission",
        "body": [
          "<ul><li>Identify the governing association or district and the area’s ownership.</li><li>Include the layout, product details and relevant views.</li><li>Describe proposed drainage or grading changes.</li><li>Ask for a written response identifying any conditions.</li><li>Request the rule or covenant behind a refusal or requested change.</li><li>Resolve disputed requirements before scheduling construction.</li></ul>",
          "Bring the response to the installation visit so the layout and price can reflect the conditions. If the dispute turns on the law or governing documents, obtain qualified advice on those documents rather than proceeding on a general website summary."
        ]
      }
    ],
    "slug": "florida-friendly-landscaping-and-hoas",
    "sources": [
      {
        "label": "Fla. Stat. 373.185 — Florida-friendly landscaping",
        "cite": "Fla. Stat. § 373.185(1)(b), (3)(b)–(c) (2025); history note s. 17, ch. 2009-243",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/0373.185",
        "checked": "2026-09-07"
      },
      {
        "label": "Fla. Stat. 720.3075 — HOA documents and Florida-friendly landscaping",
        "cite": "Fla. Stat. § 720.3075(4)(b) (2025)",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/720.3075",
        "checked": "2026-09-07"
      },
      {
        "label": "Fla. Stat. 720.3045 — installation, display, and storage of items",
        "cite": "Fla. Stat. § 720.3045 (2025); history s. 3, ch. 2023-64; s. 6, ch. 2024-221",
        "url": "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=0700-0799/0720/Sections/0720.3045.html",
        "checked": "2026-09-07"
      },
      {
        "label": "Fla. Stat. 720.3035 — architectural review authority",
        "cite": "Fla. Stat. § 720.3035(1)(a), (3), (4)(a), (5) (2025)",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/720.3035",
        "checked": "2026-09-07"
      },
      {
        "label": "Fla. Stat. 125.572 — regulation of synthetic turf",
        "cite": "Fla. Stat. § 125.572(3)(a)–(b); history s. 1, ch. 2025-140; s. 1, ch. 2026-164",
        "url": "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=0100-0199%2F0125%2FSections%2F0125.572.html",
        "checked": "2026-09-07"
      },
      {
        "label": "Rule 62-308.100, F.A.C. — Synthetic Turf",
        "cite": "Fla. Admin. Code R. 62-308.100, effective 19 May 2026 (file date 29 April 2026; history note \"New 5-19-26\")",
        "url": "https://www.flrules.org/gateway/ruleNo.asp?id=62-308.100",
        "checked": "2026-09-07"
      },
      {
        "label": "Florida DEP Synthetic Turf FAQ",
        "cite": "Fla. Dep't of Envtl. Prot., Div. of Water Restoration Assistance, Synthetic Turf FAQ (last modified 4 Aug. 2026)",
        "url": "https://floridadep.gov/sites/default/files/SyntheticTurfFAQ%20final.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "SB 1180 (2026) — CDD carve-out, Senate Fiscal Policy analysis",
        "cite": "Fla. S. Comm. on Fiscal Policy, Analysis of SB 1180 (2026), enacted as ch. 2026-164, eff. 1 July 2026",
        "url": "https://www.flsenate.gov/Session/Bill/2026/1180/Analyses/2026s01180.fp.PDF",
        "checked": "2026-09-07"
      },
      {
        "label": "HB 803 (2026), ch. 2026-63 — chapter law",
        "cite": "Ch. 2026-63, Laws of Fla. (HB 803), approved 6 May 2026, eff. 1 July 2026 (amending ss. 553.79 and 720.3035)",
        "url": "https://www.nassaucountyfl.com/DocumentCenter/View/31830/Chapter-2026-63-HB803",
        "checked": "2026-09-07"
      },
      {
        "label": "HB 683 (2025) — Construction Regulations",
        "cite": "CS/CS/CS/HB 683 (2025), ch. 2025-140, Laws of Fla., approved 13 June 2025, eff. 1 July 2025",
        "url": "https://www.flsenate.gov/Session/Bill/2025/683",
        "checked": "2026-09-07"
      },
      {
        "label": "UF/IFAS EP612 — Synthetic Turfgrass and the Nine Principles of Florida-Friendly Landscaping",
        "cite": "Kruse et al., ENH1348/EP612, UF/IFAS Extension",
        "url": "https://ask.ifas.ufl.edu/publication/EP612",
        "checked": "2026-09-07"
      },
      {
        "label": "UF/IFAS — Considering Synthetic Turf: What Homeowners Should Know",
        "cite": "Jason Kruse, UF/IFAS Global blog, 15 July 2025",
        "url": "https://blogs.ifas.ufl.edu/global/2025/07/15/considering-synthetic-turf-what-homeowners-should-know-before-installation/",
        "checked": "2026-09-07"
      },
      {
        "label": "Cypress Trails at Nocatee Architectural Review Manual",
        "cite": "Cypress Trails at Nocatee ARB Manual, rev. 05-06-2020 (BCM Services, Inc.)",
        "url": "https://www.cypresstrailshoa.com/wp-content/uploads/sites/126/2024/05/CT-Arch-Review-Manual-05-06-2020.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Nocatee neighborhood HOA directory",
        "cite": "Nocatee, Homeowners Association Websites (directory of 50+ neighborhood associations)",
        "url": "https://www.nocatee.com/homeowners-association-websites",
        "checked": "2026-09-07"
      },
      {
        "label": "St. Johns County Land Development Code",
        "cite": "St. Johns County LDC, consolidated edition of 4 March 2025, Art. XII (Definitions: Impervious Surfaces)",
        "url": "https://www.sjcfl.us/wp-content/uploads/2024/01/entire-ldc-march-4-2025.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Synthetic Turf Council — Florida law page",
        "cite": "Synthetic Turf Council, Florida Law FAQ",
        "url": "https://www.syntheticturfcouncil.org/page/florida-law",
        "checked": "2026-09-07"
      }
    ],
    "title": "Florida Turf & HOA Approval | TIMELESS Grass & Greens",
    "updated": "2026-09-11",
    "faq": [],
    "publicReferences": [
      "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=0700-0799/0720/Sections/0720.3045.html",
      "https://floridadep.gov/sites/default/files/SyntheticTurfFAQ%20final.pdf",
      "https://ask.ifas.ufl.edu/publication/EP612",
      "https://www.nocatee.com/homeowners-association-websites"
    ]
  },
  {
    "answer": {
      "question": "What should a Colorado homeowner submit for turf approval?",
      "answer": "Colorado law protects certain uses of nonvegetative turf in residential backyards, but that does not make every yard project automatically approved. Confirm the property type and proposed location, submit a clear layout and account for applicable safety, drainage and public requirements. Front yards and common property need their own analysis."
    },
    "description": "Colorado protects certain residential backyard turf choices, with limitations. Identify the yard, property type and governing documents before submitting a layout.",
    "h1": "What should a Colorado homeowner submit for turf approval?",
    "market": "denver-metro",
    "sections": [
      {
        "h2": "Identify the yard and the applicable documents",
        "body": [
          "Confirm that the proposed area belongs to your lot and whether the home is attached or detached. Show the turf boundary clearly, including any side or front area. Obtain the current architectural requirements and the submission process.",
          "The backyard protection in Colorado’s statutes is relevant to an association’s response. Keep the location and actual work clear rather than relying on a shorthand claim that an HOA cannot regulate turf at all. The statutes retain qualifications, including public requirements and certain safety or site conditions."
        ]
      },
      {
        "h2": "Keep other property questions separate",
        "body": [
          "A common entrance, shared park or other association-owned land is a different project from a private yard. Colorado’s landscape restrictions address covered common property and functional use; the <a href=\"/guides/colorado-turf-law/\">Colorado turf law guide</a> explains those distinctions.",
          "Identify any relevant municipality or district requirements for the proposed grading, drainage or surface. An association response does not establish that a public requirement has been met.",
          "Rebate eligibility also needs its own confirmation with the water provider. The <a href=\"/guides/colorado-water-rebates-and-turf/\">rebate guide</a> explains why an acceptable landscape change may still be ineligible for an incentive."
        ]
      },
      {
        "h2": "Submission checklist",
        "body": [
          "<ul><li>Property type and ownership of the proposed area.</li><li>Layout identifying backyard, side and front portions.</li><li>Product information and the work proposed below it.</li><li>Any safety, fire-buffer or drainage conditions.</li><li>Current community requirements and written response.</li><li>Separate public review and funding confirmations.</li></ul>",
          "If the association refuses the plan, request the requirement behind that response. A disagreement about statutory protection should be reviewed against the actual documents before construction proceeds. This guide does not prescribe a demand letter or litigation step.",
          "Bring any confirmed conditions to the free TIMELESS visit so the layout and written price can account for them."
        ]
      }
    ],
    "slug": "colorado-hoa-turf-rules",
    "sources": [
      {
        "label": "Colorado HB21-1229 (2021), signed act",
        "cite": "Inserted \"nonvegetative turf grass\" into C.R.S. 38-33.3-106.5(1)(i) and C.R.S. 37-60-126(11)(a). Signed 2 July 2021, effective 7 September 2021, Chapter 409.",
        "url": "https://content.leg.colorado.gov/sites/default/files/2021a_1229_signed.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado SB23-178 (2023), signed act",
        "cite": "Limited 38-33.3-106.5(1)(i) to attached homes; added (1)(i.5) for detached single-family homes, including the backyard protection, the 20% hardscape and 80% drought-tolerant provisions, the three preapproved front-yard designs, the 45-day cure and $500-or-actual-damages remedy, and the safety, fire and drainage carve-outs. Signed 17 May 2023, effective 7 August 2023.",
        "url": "https://content.leg.colorado.gov/sites/default/files/2023a_178_signed.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "C.R.S. 37-60-126, current text",
        "cite": "Subsection (11)(a)(I) public-policy sentence, quoted on this page: a covenant, declaration, bylaw or rule of a common interest community or special district \"that prohibits or limits xeriscape, prohibits or limits the installation or use of drought-tolerant vegetative landscapes, requires cultivated vegetation to consist wholly or partially of turf grass, or prohibits the use of nonvegetative turf grass in the backyard of a residential property is hereby declared contrary to public policy and, on that basis, is unenforceable.\" Definitions at (11)(b), which do not define \"nonvegetative turf grass\". Carve-out at (11)(d)(I), quoted on this page: subsection (11) \"does not supersede any subdivision regulation of a county, city and county, or other municipality\". Special district direct-conflict rule at (11)(d)(II).",
        "url": "https://codes.findlaw.com/co/title-37-water-and-irrigation/co-rev-st-sect-37-60-126/",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado HB25-1113 (2025), signed act",
        "cite": "Amended C.R.S. 37-99-103(1) to insert NONFUNCTIONAL before \"artificial turf\"; added the definition of functional artificial turf at 37-99-102(6.5) and nonfunctional artificial turf at 37-99-102(12.5); repealed the residential exclusion and added applicable residential real property at 37-99-102(1.5); added 37-99-103(5)(a) and 37-99-104. Signed 20 May 2025, effective 6 August 2025.",
        "url": "https://content.leg.colorado.gov/sites/default/files/2025a_1113_signed.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado SB24-005 (2024), signed act",
        "cite": "Created Article 99 of Title 37. Definitions of applicable property (37-99-102(1)), common interest community property (37-99-102(5)), local entity including metropolitan districts (37-99-102(9)), new development project (37-99-102(12)) and redevelopment project with the 50% aggregate-landscape-area trigger (37-99-102(14)); grandfathering at 37-99-103(4)(a); more-stringent local authority at 37-99-103(4)(d).",
        "url": "https://content.leg.colorado.gov/sites/default/files/2024a_005_signed.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado General Assembly bill page, HB25-1113",
        "cite": "Signature and effective dates: signed 20 May 2025, effective 6 August 2025, Chapter 221.",
        "url": "https://leg.colorado.gov/bills/hb25-1113",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado Division of Real Estate, 2025 HOA Forum legislative summaries",
        "cite": "Reads HB25-1113 as prohibiting these landscaping practices on the common elements of common interest communities with more than twelve dwelling units \"on or after January 1, 2026\" — one side of the date conflict reported on this page.",
        "url": "https://dre.colorado.gov/sites/dre/files/documents/2025-07-25%20HOA%20Forum%202025%20Legislative%20Summaries.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Western Resource Advocates, SB24-005 simplified compliance guide (2025)",
        "cite": "Reads the multifamily obligation as a 1 January 2028 deadline, and notes that on redeveloped parcels only the disturbed portion of landscaping must conform — the other side of the date conflict.",
        "url": "https://westernresourceadvocates.org/wp-content/uploads/2025/08/2025_SB24-005_Simplified-Guide.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Centennial Water & Sanitation District (Highlands Ranch), Turf Replacement Program",
        "cite": "\"Artificial turf replacements are no longer eligible for rebate.\" Rebates listed at $2.50/sq ft for ColoradoScape and $1.50/sq ft for low-water use turf.",
        "url": "https://www.centennialwater.org/turf-replacement-program",
        "checked": "2026-09-07"
      },
      {
        "label": "Town of Erie, 2026 Turf Replacement Rebate Program",
        "cite": "Requirements open with \"Artificial Turf is not eligible for this rebate.\" $2/sq ft for low-water plantings, $1/sq ft for low-water grasses, living plant material must be 70% of the project area.",
        "url": "https://www.erieco.gov/1962/2026-Turf-Replacement-Rebate-Program",
        "checked": "2026-09-07"
      },
      {
        "label": "Thornton Water, 2026 Artificial Turf Rules for Water-Wise Landscape Rebate",
        "cite": "Up to $2 per square foot for qualifying 200–1,000 sq ft projects, lifetime maximum $2,000 per residential lot; turf must replace high-water-demand lawn, not existing hardscape.",
        "url": "https://www.thorntonwater.com/wp-content/uploads/2026/02/2026-residential_artificial_turf_info__rules-1.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Thornton Water, HOA rebates and free services",
        "cite": "Rebate rules require HOA approval where applicable; summarizes HB21-1229 as allowing regulation of non-vegetative turf in backyard areas of units.",
        "url": "https://www.thorntonwater.com/hoa-rebates-and-free-services/",
        "checked": "2026-09-07"
      },
      {
        "label": "Denver Water, Landscape Transformation Assistance Program — HOA and commercial",
        "cite": "Lists among what Denver Water will not fund: \"Designs that include artificial turf, landscape fabrics/weed barriers or hardscapes.\"",
        "url": "https://www.denverwater.org/business/rebates-and-conservation-tips/landscape-transformation-assistance-program/hoa-commercial",
        "checked": "2026-09-07"
      },
      {
        "label": "Castle Pines Village, Colorado — community profile",
        "cite": "Gated unincorporated CDP in Douglas County, 2,850 acres, 4,327 residents at the 2020 census, served by the Castle Pines Homes Association and the Castle Pines Metropolitan District.",
        "url": "https://en.wikipedia.org/wiki/Castle_Pines_Village,_Colorado",
        "checked": "2026-09-07"
      }
    ],
    "title": "Colorado HOA Turf Approval | TIMELESS Grass & Greens",
    "updated": "2026-09-11",
    "faq": [],
    "publicReferences": [
      "https://content.leg.colorado.gov/sites/default/files/2021a_1229_signed.pdf",
      "https://content.leg.colorado.gov/sites/default/files/2023a_178_signed.pdf",
      "https://codes.findlaw.com/co/title-37-water-and-irrigation/co-rev-st-sect-37-60-126/"
    ]
  },
  {
    "answer": {
      "question": "How do you check the credentials for a turf installation?",
      "answer": "The requirements depend on the address, complete scope and who performs each part. Ask the responsible authority which credentials apply, then verify the supplied details in the appropriate official register. A general claim of being licensed, or having no turf-specific license, does not answer every part of the job."
    },
    "description": "Check the complete turf project with the relevant authority, then verify the required credentials for the company and trades doing the work.",
    "faq": [],
    "h1": "How do you check the credentials for a turf installation?",
    "market": "all",
    "sections": [
      {
        "h2": "Describe the complete work first",
        "body": [
          "Include preparation, grading, drainage, retaining features and any irrigation, plumbing or electrical changes. Identify the company responsible for the contract and any specialist subcontractors. Contract value or combined work can also matter under the applicable rules, so present the full proposal.",
          "Ask the relevant building or licensing office which requirements apply to that scope and location. Keep the response. Avoid using one dollar threshold from an online summary as the entire answer for a job involving several trades."
        ]
      },
      {
        "h2": "Verify the details with the correct authority",
        "body": [
          "<ul><li><strong>South Carolina:</strong> use <a href=\"https://verify.llronline.com/LicLookup/\" target=\"_blank\" rel=\"nofollow noopener\">LLR’s public license lookup</a> to check a credential the contractor provides, and ask the relevant board about its scope.</li><li><strong>North Carolina:</strong> use the <a href=\"https://public-nclclb.arlsys.com/Public/Search\" target=\"_blank\" rel=\"nofollow noopener\">Landscape Contractors’ Licensing Board search</a> for a landscape credential. Ask about other work included in the project rather than treating one license as covering every trade.</li><li><strong>Colorado:</strong> confirm applicable local contractor requirements with the jurisdiction and use <a href=\"https://apps2.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx\" target=\"_blank\" rel=\"nofollow noopener\">DORA’s lookup</a> for relevant state-regulated professionals or trades.</li><li><strong>Florida:</strong> check supplied state credentials through <a href=\"https://www.myfloridalicense.com/wl11.asp\" target=\"_blank\" rel=\"nofollow noopener\">DBPR’s license search</a> and confirm the project’s local requirements with the responsible office.</li></ul>",
          "Match the legal name, status and scope to the entity doing the work. If a lookup result is unclear or unavailable, contact the issuing authority. Do not assume a similarly named business or an old card establishes current coverage."
        ]
      },
      {
        "h2": "Check the proposal as well as the credential",
        "body": [
          "Ask for relevant insurance documentation and verify it with the issuer where appropriate. Request examples or references that can be truthfully tied to the contractor. This page does not establish a license, insurance policy or certification held by TIMELESS; request any documentation applicable to the proposed work.",
          "The written scope should identify materials, preparation, drainage, seams, edges, cleanup and responsibilities. The <a href=\"/blog/how-to-read-a-turf-quote/\">quote checklist</a> helps make competing proposals comparable."
        ]
      },
      {
        "h2": "Before signing checklist",
        "body": [
          "<ul><li>The full scope and contracting entity are named.</li><li>The authority has identified applicable requirements.</li><li>Required credentials match the entity, status and work.</li><li>Specialist trades and their responsibilities are clear.</li><li>Insurance and any claimed qualifications are documented.</li><li>The written scope matches the price and agreed materials.</li></ul>"
        ]
      }
    ],
    "slug": "turf-installer-licensing-by-state",
    "sources": [
      {
        "label": "SC Code Ann. Title 40 Chapter 11 — Contractors' Licensing Board",
        "cite": "40-11-30: \"No entity or individual may practice as a contractor by performing or offering to perform contracting work for which the total cost of construction is greater than ten thousand dollars for general contracting... without a license issued in accordance with this chapter.\" Threshold raised from $5,000 by 2023 Act No. 69, effective 19 May 2023. 40-11-20(10) defines general construction as \"improvement of any kind to real property\"; 40-11-410 lists the Grading subclassification. No landscaping classification appears in the chapter.",
        "url": "https://www.scstatehouse.gov/code/t40c011.php",
        "checked": "2026-09-07"
      },
      {
        "label": "SC Code Ann. Title 40 Chapter 59 — Residential Builders Commission",
        "cite": "40-59-20 defines a residential builder by work \"when the cost of the undertaking exceeds five thousand dollars\" and a residential specialty contractor by undertakings that \"exceed five hundred dollars.\" The enumerated specialty trades are plumbers, electricians, HVAC, siding, insulation, roofing, floor covering, masonry, drywall, carpentry, stucco, painting and wallpapering, and solar panel installers. Landscaping is not among them.",
        "url": "https://www.scstatehouse.gov/code/t40c059.php",
        "checked": "2026-09-07"
      },
      {
        "label": "South Carolina LLR public license verification portal",
        "cite": "Public lookup for South Carolina contractor and residential builder licenses. Caveat recorded at the time of checking: verify.llronline.com and llr.sc.gov were both unreachable, and archived captures show LLR reorganised its site during 2025–2026 with older contractor paths returning 404. Confirm the page loads before relying on it.",
        "url": "https://verify.llronline.com/LicLookup/",
        "checked": "2026-09-07"
      },
      {
        "label": "N.C. Gen. Stat. Chapter 89D — Landscape Contractors",
        "cite": "89D-13(5) exempts \"Any landscaping work where the price of all contracts for labor, material, and other items for a given job site during any consecutive 12-month period is less than thirty thousand dollars ($30,000)\" and bars local governments from requiring licensure for that work. 89D-12(c) exempts a licensed landscape contractor from general contractor licensing above $40,000. 89D-12(e) requires the license number \"on all business cards, contracts, and vehicles used by the contractor.\"",
        "url": "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByChapter/Chapter_89D.html",
        "checked": "2026-09-07"
      },
      {
        "label": "21 NCAC Chapter 28B — NC Landscape Contractors' Licensing Board rules",
        "cite": ".0503(b): \"When installing artificial turf, the licensed contractor shall: (1) Ensure that the sub-grade is compacted and shall pitch properly to drain; (2) Establish a perimeter attachment system to secure the artificial turf; (3) Roll out the turf with the nap facing a consistent direction; (4) Secure the turf with an evenly weighted sand layer distributed over the entire surface; and (5) Follow all manufacturer's specifications for the type of turf being installed.\" Effective 1 September 2016, amended 1 July 2021. .0501(a) requires a written agreement, containing the license number, for services exceeding $5,000 before work commences.",
        "url": "http://reports.oah.state.nc.us/ncac/title%2021%20-%20occupational%20licensing%20boards%20and%20commissions/chapter%2028%20-%20landscape%20contractors/chapter%2028%20rules.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "NC Landscape Contractors' Licensing Board — public license search",
        "cite": "Public licensee search used to verify an individual or corporate North Carolina landscape contractor license.",
        "url": "https://public-nclclb.arlsys.com/Public/Search",
        "checked": "2026-09-07"
      },
      {
        "label": "N.C. Gen. Stat. Chapter 89G — Irrigation Contractors",
        "cite": "89G-3(5) exempts irrigation construction or contracting work \"where the price of all contracts for labor, material, and other items for a given jobsite is less than two thousand five hundred dollars ($2,500).\" G.S. 89D-12(b)(4) confirms the landscape contractor chapter does not authorize irrigation contracting.",
        "url": "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByChapter/Chapter_89G.html",
        "checked": "2026-09-07"
      },
      {
        "label": "North Carolina Licensing Board for General Contractors",
        "cite": "\"By law, a general contractor must be licensed if the total project cost is valued at $40,000 or higher.\"",
        "url": "https://nclbgc.org/",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado DORA, Division of Professions and Occupations — regulated professions",
        "cite": "The published occupational list contains accountancy; architects, professional engineers and land surveyors; barber and cosmetology; combative sports; electrical; landscape architects; nontransplant tissue banks; outfitter; passenger tramway; plumbing; radon professionals. There is no general contractor, landscape contractor, hardscape, irrigation or synthetic-turf credential.",
        "url": "https://dpo.colorado.gov/About",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado DORA license lookup",
        "cite": "State-level verification for the two trades Colorado does license and that a turf job can touch — electrical and plumbing.",
        "url": "https://apps2.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx",
        "checked": "2026-09-07"
      },
      {
        "label": "Fla. Stat. 489.105(3) — definition of contractor",
        "cite": "Defines \"contractor\" by a closed list of Division I and Division II categories plus \"specialty contractor\", limited to work that improves \"any building or structure, including related improvements to real estate\" and whose \"job scope is substantially similar to the job scope described in one of the paragraphs of this subsection.\" Landscaping, sod, turf and artificial turf appear nowhere in the section.",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/489.105",
        "checked": "2026-09-07"
      },
      {
        "label": "Fla. Stat. 163.211 — preemption of occupational licensing",
        "cite": "\"The licensing of occupations is expressly preempted to the state.\" Local licensing of occupations in place before 1 January 2021 was allowed to continue only temporarily and \"any such local government licensing of occupations expires on July 1, 2025.\" History: ch. 2021-214 (HB 735); ch. 2023-271 (HB 1383); ch. 2024-212 (SB 1142).",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/163.211",
        "checked": "2026-09-07"
      },
      {
        "label": "Nassau County, Florida — Local Licensing Notice to Contractors, 1 July 2025",
        "cite": "\"As of July 1, 2025, Nassau County will continue to issue the following 'registered' contractor licenses via a certificate of competency. The license category types, definitions / scope of work, required work experience, etc. mirror the available state certified license categories through Florida DBPR, CILB and the ECLB.\" The listed categories include irrigation and fence specialties but contain no landscaping, turf, sod, hardscape or grading category.",
        "url": "https://www.nassaucountyfl.com/DocumentCenter/View/30080/Local-Licensing-Notice-to-Contractors-JULY-1-2025-",
        "checked": "2026-09-07"
      },
      {
        "label": "Jacksonville Ordinance Code s. 342.110 — trades, crafts and contractors",
        "cite": "342.110(a): \"This Chapter applies only to the trades, crafts and contractors specifically provided in this Section.\" The enumerated subsections run from electrical construction to demolition specialty and include (m) Irrigation installations. There is no landscaping, turf, sod or grading category.",
        "url": "https://library.municode.com/fl/jacksonville/codes/code_of_ordinances?nodeId=TITVIIICOREBUCO_CH342COTRRE_S342.110TRCRCOSU",
        "checked": "2026-09-07"
      },
      {
        "label": "Clay County Code Chapter 7 — Building Contractors, Craftsmen, Etc.",
        "cite": "Sec. 7-1(d) requires certificates of competency for \"those crafts or trades identified herein\"; Sec. 7-1(e): \"This chapter shall be effective in all the unincorporated areas of Clay County, Florida.\" A full-text search of Chapter 7 returns no landscaping, turf or irrigation trade category.",
        "url": "https://library.municode.com/fl/clay_county/codes/code_of_ordinances?nodeId=CO_CH7BUCOCRET_ARTIINGE_S7-1FIFASC",
        "checked": "2026-09-07"
      },
      {
        "label": "St. Johns County Contractor Licensing",
        "cite": "\"Before hiring anyone to work on your house, your business or your jobsite, first ask to see their contractor's license (either a St. Johns County license card the size of a credit card or a State Certified, Department of Business and Professional Regulation license) and proof of liability insurance and workers compensation insurance.\" The county warns that \"Hiring an unlicensed contractor is a violation of Florida Statute 455.228 and is subject to a $5,000 fine\" and lists red flags including \"They claim a license or permit 'isn't required'.\" Its own online license search did not respond on the check date.",
        "url": "https://www.sjcfl.us/contractor-licensing/",
        "checked": "2026-09-07"
      },
      {
        "label": "Florida DBPR — Verify a Licensee",
        "cite": "State licensee search by name, license number, city, county or license type; the verification link for any Florida state-certified or registered contractor.",
        "url": "https://www.myfloridalicense.com/wl11.asp",
        "checked": "2026-09-07"
      }
    ],
    "title": "Check a Turf Installer’s Credentials | TIMELESS Grass & Greens",
    "updated": "2026-09-11",
    "publicReferences": [
      "https://verify.llronline.com/LicLookup/",
      "https://public-nclclb.arlsys.com/Public/Search",
      "https://apps2.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx",
      "https://www.myfloridalicense.com/wl11.asp"
    ]
  },
  {
    "slug": "is-artificial-turf-impervious",
    "title": "Is Artificial Turf Impervious? | TIMELESS Grass & Greens",
    "description": "Check the proposed turf, base and drainage with the office responsible for your property. A product drainage rating does not settle lot-coverage rules.",
    "h1": "Does artificial turf count as an impervious surface?",
    "market": "all",
    "updated": "2026-09-11",
    "answer": {
      "question": "Does artificial turf count as an impervious surface?",
      "answer": "It depends on the applicable rule and the installed system. Water passing through the turf backing does not settle how the project counts toward lot coverage or stormwater requirements. Bring the proposed turf, base and drainage details to the office responsible for the property before finalizing the work."
    },
    "sections": [
      {
        "h2": "Describe the complete installation",
        "body": [
          "The turf’s drainage rating describes one part of the project. The ground beneath it may absorb water more slowly. Include the proposed base and where water will go in the discussion.",
          "Ask the installer for the product sheet and a description of the layers beneath the turf. Mark existing puddles, downspouts and drains on the layout. If the yard already has a drainage problem, include its assessment in the scope before choosing the finished surface."
        ]
      },
      {
        "h2": "Check the rule for the property",
        "body": [
          "For North Carolina state and local stormwater programs, turf made to drain through its backing and installed to the manufacturer’s specifications over a pervious surface qualifies for the statutory built-upon-area exclusion. Have the reviewing office assess the proposal against those conditions. Separately identify any review needed for excavation, grading or drainage changes.",
          "For an unincorporated Horry County property, send <a href=\"https://www.horrycountysc.gov/departments/stormwater/engineers/construction/storm-water-permitting/\" target=\"_blank\" rel=\"nofollow noopener\">County Stormwater</a> the complete proposal. Ask staff to assess any exemption request against the full scope, including excavation, grading and drainage work. North Myrtle Beach has <a href=\"https://library.municode.com/sc/north_myrtle_beach/codes/code_of_ordinances?nodeId=COOR_CH23ZO_ARTVIIGESURE_S23-129.4STPESUIMSUSIMIDURENOSUSIECDEPLRE\" target=\"_blank\" rel=\"nofollow noopener\">its own pervious-surface criteria</a>, so check the property type, documentation and inspection requirements with the City.",
          "For Denver metro and northeast Florida properties, use the local planning or stormwater office for the parcel. The <a href=\"/guides/colorado-turf-law/\">Colorado turf law guide</a> and <a href=\"/guides/florida-turf-infill-rules/\">Florida turf guide</a> address where and how turf may be used; include stormwater classification as a separate project question."
        ]
      },
      {
        "h2": "Your project checklist",
        "body": [
          "Bring the address or parcel number, a simple layout, the area being converted, the product sheet and the proposed base and drainage details. Include other work such as a patio, retaining edge or new drain.",
          "<ul><li>How will this turf assembly count toward the property’s coverage and stormwater requirements?</li><li>What product data, drawings or professional details are needed?</li><li>Does the complete project need a permit, review or inspection?</li><li>Does the proposal change a drainage easement or a stormwater charge?</li></ul>",
          "Keep the written response with the layout and estimate. It gives you and the installer a common scope to price. TIMELESS offers a free visit to discuss the intended use and installation options, followed by a written price."
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "label": "N.C. Gen. Stat. 143-214.7D",
        "cite": "For state and local stormwater programs, subsection (b)(6) excludes turf manufactured to drain through its backing and installed to manufacturer specifications over a pervious surface. Subsection (d) addresses conflicting local definitions, except as required by federal law.",
        "url": "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_143/GS_143-214.7D.html",
        "checked": "2026-09-11"
      },
      {
        "label": "New Jersey Department of Environmental Protection — Synthetic Turf: A Review of the Current Science (2025)",
        "cite": "The permeability of turf backing does not establish the infiltration rate of the ground underneath.",
        "url": "https://dep.nj.gov/wp-content/uploads/dsr/synthetic-turf-report-2025.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Horry County: current stormwater permitting guidance",
        "cite": "The page gives inconsistent land-disturbance thresholds and describes staff review of exemption claims. Ask the county to determine the applicable requirements for the full project scope.",
        "url": "https://www.horrycountysc.gov/departments/stormwater/engineers/construction/storm-water-permitting/",
        "checked": "2026-09-11"
      },
      {
        "label": "North Myrtle Beach Code Sec. 23-129.4",
        "cite": "Added by Ord. No. 25-45, adopted 10-6-2025. To count as pervious a system must let water infiltrate into the ground, \"Demonstrate a minimum infiltration rate of two (2) inches per hour, based on manufacturer testing or accepted industry standards\", be installed to manufacturer spec including required base materials, pass inspection and be maintained: \"If these criteria are not met, the surface will be considered impervious, regardless of material type or labeling.\"",
        "url": "https://library.municode.com/sc/north_myrtle_beach/codes/code_of_ordinances?nodeId=COOR_CH23ZO_ARTVIIGESURE_S23-129.4STPESUIMSUSIMIDURENOSUSIECDEPLRE",
        "checked": "2026-09-07"
      },
      {
        "label": "North Myrtle Beach City Council: October 6, 2025 minutes",
        "cite": "Item 6E records second-reading approval of the pervious-surface amendment. Staff explained the manufacturer certification and possible inspection requirements.",
        "url": "https://www.nmb.us/AgendaCenter/ViewFile/Item/1308?fileID=4116",
        "checked": "2026-09-11"
      }
    ],
    "publicReferences": [
      "https://dep.nj.gov/wp-content/uploads/dsr/synthetic-turf-report-2025.pdf",
      "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_143/GS_143-214.7D.html",
      "https://www.horrycountysc.gov/departments/stormwater/engineers/construction/storm-water-permitting/",
      "https://library.municode.com/sc/north_myrtle_beach/codes/code_of_ordinances?nodeId=COOR_CH23ZO_ARTVIIGESURE_S23-129.4STPESUIMSUSIMIDURENOSUSIECDEPLRE"
    ]
  },
  {
    "slug": "colorado-water-rebates-and-turf",
    "title": "Denver-Area Turf Rebates | TIMELESS Grass & Greens",
    "description": "Provider rules differ. Check the account, project and selected surface before budgeting a Colorado turf rebate or beginning lawn removal.",
    "h1": "Does artificial turf qualify for a Denver-area water rebate?",
    "market": "denver-metro",
    "updated": "2026-09-11",
    "answer": {
      "question": "Does artificial turf qualify for a Denver-area water rebate?",
      "answer": "Eligibility depends on the water provider and the exact program. Several Denver-area lawn-conversion programs exclude artificial turf, while Thornton publishes a dedicated set of artificial-turf rebate requirements. Confirm the current terms, funding and any required approval for your property before including an incentive in the budget."
    },
    "sections": [
      {
        "h2": "Use the provider on the water bill",
        "body": [
          "A city name alone may not identify the water provider. Confirm the account and whether the application is residential, association or commercial. Ask about the intended turf area and selected materials before removing the existing lawn.",
          "A landscape program may support planted replacements while excluding artificial turf. Approval for a surface under planning or HOA rules is a separate question from whether a conservation program will help fund it."
        ]
      },
      {
        "h2": "Start with the relevant program",
        "body": [
          "<ul><li><strong>Thornton:</strong> its <a href=\"https://www.thorntonwater.com/wp-content/uploads/2026/02/2026-residential_artificial_turf_info__rules-1.pdf\" target=\"_blank\" rel=\"nofollow noopener\">artificial-turf rules</a> include project, permit and product-document requirements. Check those conditions, current funds and application steps before ordering.</li><li><strong>Denver Water:</strong> its <a href=\"https://www.denverwater.org/tap/ditching-useless-turf-coloradoscape-we-can-help\" target=\"_blank\" rel=\"nofollow noopener\">turfgrass-removal discount</a> is for an eligible water-wise replacement and excludes artificial turf.</li><li><strong>Aurora:</strong> the <a href=\"https://www.auroragov.org/UserFiles/Servers/Server_1881137/File/Residents/Water/Water%20Conservation/Landscape%20rebate/GRIP_Residential_Manual_2026_web_accessible.pdf\" target=\"_blank\" rel=\"nofollow noopener\">residential GRIP manual</a> lists artificial turf among prohibited materials for that program.</li><li><strong>Castle Rock:</strong> the <a href=\"https://crconserve.com/153/Rebates\" target=\"_blank\" rel=\"nofollow noopener\">ColoradoScape rebate</a> excludes artificial turf.</li><li><strong>Highlands Ranch:</strong> check <a href=\"https://www.centennialwater.org/turf-replacement-program\" target=\"_blank\" rel=\"nofollow noopener\">Centennial Water’s turf-replacement program</a>; its published terms exclude artificial turf.</li><li><strong>Erie:</strong> the <a href=\"https://www.erieco.gov/1962/2026-Turf-Replacement-Rebate-Program\" target=\"_blank\" rel=\"nofollow noopener\">turf-replacement program</a> also excludes artificial turf.</li></ul>",
          "These program distinctions do not confirm that an application window is open or money remains. For another provider, ask it directly for current written terms instead of applying a neighboring city’s offer."
        ]
      },
      {
        "h2": "Compare cost without an assumed payment",
        "body": [
          "Ask for the complete installation price and list any confirmed rebate separately. Check whether the design has to be approved in advance and what inspections, receipts or completion records will be needed.",
          "Compare future water use with your actual lawn, bill and proposed care routine. Turf removes irrigation for grass growth from the converted area, but cleaning can still use water. A regional savings estimate is not a prediction of your bill.",
          "For a mixed layout, compare a planted water-wise design and a focused turf area on their own merits. The <a href=\"/blog/artificial-turf-vs-xeriscape-denver/\">turf and xeriscape article</a> helps make that comparison."
        ]
      },
      {
        "h2": "Application checklist",
        "body": [
          "<ul><li>Correct provider, account and applicant type.</li><li>Explicit eligibility for the proposed surface.</li><li>Current funding and application dates.</li><li>Required approval before work begins.</li><li>Product, permit and installation documentation.</li><li>Confirmed payment calculation and completion requirements.</li></ul>",
          "If an item is unconfirmed, keep the full project cost in the budget until the program answers it in writing."
        ]
      }
    ],
    "faq": [],
    "sources": [
      {
        "label": "Thornton Water — 2026 Artificial Turf Rules for Water-Wise Landscape Rebate (PDF)",
        "cite": "\"The residential water-wise landscape rebate provides up to $2 per square foot for qualifying 200 – 1,000 square feet projects. The rebate has a lifetime maximum of $2,000 per residential lot. To be eligible for the rebate, artificial turf must replace an area of high-water demand lawn, such as Kentucky Bluegrass, on existing residential lots or areas of no landscaping on new construction residential lots.\" Also: Minor Development Permit required before installation; \"Artificial turf allowed with no limitations\" in rear and enclosed side yards; \"Artificial turf shall not exceed 25% of the landscape area\" in front and unenclosed side yards; minimum eight-year fade warranty; backing must drain a minimum of two inches per hour; all products PFAS-free with third-party or manufacturer documentation, \"PFC-free\" not sufficient; one tree equivalent per first 750 sq ft, half per additional 250 sq ft; scope limited to front, back and side yards of single-family detached and attached dwellings.",
        "url": "https://www.thorntonwater.com/wp-content/uploads/2026/02/2026-residential_artificial_turf_info__rules-1.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Denver Water — turfgrass removal discount",
        "cite": "\"Application requirements include the removal of at least 200 square feet of water-intensive turf, a photo of the area to be transformed and plans for the new water-wise landscape that will be created (artificial turf is not allowed).\" And: \"Due to popularity, the turfgrass removal discounts for 2026 have all been allocated to customer projects for the year: Resource Central no longer accepts new applications.\"",
        "url": "https://www.denverwater.org/tap/ditching-useless-turf-coloradoscape-we-can-help",
        "checked": "2026-09-07"
      },
      {
        "label": "Denver Water — Landscape Transformation Assistance Program, HOA and commercial eligibility",
        "cite": "Under \"What Denver Water will NOT fund for HOAs/Commercial Projects\": \"Designs that include artificial turf, landscape fabrics/weed barriers or hardscapes. These do not benefit the environment.\" Program funds up to 50% of project cost; 2027 funding cycle opened 1 September 2026.",
        "url": "https://www.denverwater.org/business/rebates-and-conservation-tips/landscape-transformation-assistance-program/hoa-commercial",
        "checked": "2026-09-07"
      },
      {
        "label": "Denver Water — summer watering rules and drought stage",
        "cite": "\"Denver Water's annual watering rules are enforced May 1 to Oct. 1 every year, regardless of conditions.\" Stage 1 drought: 20% total use reduction, \"mandatory outdoor watering restrictions of two days per week on assigned days,\" watering \"only allowed before 10 a.m. or after 6 p.m.\" Enforcement for single-family residential: \"First violation: Warning. Second: $250. Third: $500. Fourth: $1,000.\" Notice dated 08/26/2026: the Board \"declares an end to lawn watering season, prohibiting lawn watering and all spray irrigation after Sept. 30.\"",
        "url": "https://www.denverwater.org/residential/rebates-and-conservation-tips/summer-watering-rules",
        "checked": "2026-09-07"
      },
      {
        "label": "Denver Water — 2026 residential rates",
        "cite": "Inside City of Denver, per 1,000 gallons: Tier 1 $3.02; Tier 2 $5.44 plus $1.10 drought charge = $6.54; Tier 3 $7.25 plus $2.20 drought charge = $9.45. Outside City Total Service Tier 3 $10.49 plus $2.20 = $12.69. Temporary drought pricing in effect through 30 April 2027.",
        "url": "https://www.denverwater.org/residential/billing-and-rates/2026-rates",
        "checked": "2026-09-07"
      },
      {
        "label": "Aurora Water — GRIP Residential Manual 2026 (PDF)",
        "cite": "\"The landscape must include a minimum of 50% living plant material coverage… (i.e. grass cannot be replaced with just rocks, artificial turf, etc.)\" and, in the prohibited list, \"X Artificial turf.\" Rates: $3.00 per square foot for a traditional water-wise landscape, $0.50 per square foot for a native/low-water grass landscape.",
        "url": "https://www.auroragov.org/UserFiles/Servers/Server_1881137/File/Residents/Water/Water%20Conservation/Landscape%20rebate/GRIP_Residential_Manual_2026_web_accessible.pdf",
        "checked": "2026-09-07"
      },
      {
        "label": "Aurora Water — drought restrictions",
        "cite": "\"Irrigation of grass is limited to two days per week… No watering permitted between 10 a.m. and 6 p.m. No new cool-weather turf can be installed.\" And: \"Due to the intensity of the worst drought the arid West has seen in 1,200 years, Aurora's reservoirs are currently about half full.\"",
        "url": "https://www.auroragov.org/residents/water/drought",
        "checked": "2026-09-07"
      },
      {
        "label": "Castle Rock Water — ColoradoScape Renovation Rebate",
        "cite": "\"Artificial turf does not qualify for any part of the rebate\" — stated for both the residential and non-residential programs. Rates: $3.25 per square foot for low-water ColoradoScape, $1.00 per square foot for concrete/wood-composite decks or other non-permeable surfaces. Residential minimum 400 sq ft or the entire front yard, maximum 1,500 sq ft per account.",
        "url": "https://crconserve.com/153/Rebates",
        "checked": "2026-09-07"
      },
      {
        "label": "Centennial Water & Sanitation District (Highlands Ranch) — Turf Replacement Program",
        "cite": "\"Artificial turf replacements are no longer eligible for rebate. We apologize for any inconvenience. $2.50/sq. ft. for ColoradoScape… $1.50/sq. ft. for low-water use turf: Dog Tuff, Tahoma 31.\" All 2026 rebate funding exhausted; the turf replacement rebate reopens 1 March 2027. Also: \"The average participant in our turf replacement program saves 25,000 gallons of water annually.\"",
        "url": "https://www.centennialwater.org/turf-replacement-program",
        "checked": "2026-09-07"
      },
      {
        "label": "Town of Erie — 2026 Turf Replacement Rebate Program",
        "cite": "\"Artificial Turf is not eligible for this rebate.\" $2 per square foot for low-water-use garden plantings, $1 per square foot for low-water-use grasses, minimum 200 sq ft, maximum $2,000 per water account per year, living plant material must account for 70% of the project area. As of 18 August 2026 funding is fully committed and 2026 work will not be retroactively eligible.",
        "url": "https://www.erieco.gov/1962/2026-Turf-Replacement-Rebate-Program",
        "checked": "2026-09-07"
      },
      {
        "label": "Castle Pines North Metropolitan District — Conservation Rebates & Discounts",
        "cite": "Sod Replacement Rebate up to $3.00 per square foot for residential ColoradoScape and $1.50 for low-water turf; \"Designs must contain a minimum of roughly 50% ColoradoScape plant material\" and projects must \"contain at least 50% healthy plant material.\" NOT FOUND: no sentence naming artificial turf on the page or in the program table PDF — the exclusion is by implication only. Confirm with CPNMD before relying on it.",
        "url": "https://www.cpnmd.org/conservation-rebates-discounts",
        "checked": "2026-09-07"
      },
      {
        "label": "Parker Water & Sanitation District — rebates",
        "cite": "\"PWSD has partnered with the South Metro Water Supply Authority to offer $750 turf removal discounts to our customers through Resource Central.\" No per-square-foot rate of its own, so Resource Central's eligibility rule governs.",
        "url": "https://www.pwsd.org/3367/Rebates",
        "checked": "2026-09-07"
      },
      {
        "label": "Resource Central — Lawn Replacement Program",
        "cite": "\"Project areas must be at least 200 square feet and replaced with at least 50% waterwise plants.\" \"Our Program Is Full For 2026 And We Have Closed Applications\" — after replacing over 400,000 sq ft of lawn this season. \"10 Gallons of Water Saved Per Square Foot of Lawn Converted Annually.\" Administers lawn replacement for 30+ Front Range providers including Denver Water, Boulder, Arvada, Aurora, Brighton, Broomfield, Castle Pines North MD, Castle Rock, Erie, Golden, Highlands Ranch, Lafayette, Littleton, Louisville, Northglenn, Parker WSD, South Adams County WSD, Superior, Thornton, Westminster and Wheat Ridge.",
        "url": "https://resourcecentral.org/lawn/",
        "checked": "2026-09-07"
      },
      {
        "label": "Town of Superior — Water Efficiency Rebate Program",
        "cite": "NOT FOUND for turf. Rebates cover fixtures and irrigation equipment only: shower heads $5 each (max $20), dishwasher $50, toilets $75 each (max $225), clothes washer $100, high-efficiency sprinkler nozzles $3 each, WaterSense controllers up to $100, rain barrels up to $50 each, drip equipment up to $50. No turf replacement or landscape transformation rebate.",
        "url": "https://www.superiorcolorado.gov/Government/Departments/Sustainability/Sustainable-Water/Water-Efficiency-Rebate-Program",
        "checked": "2026-09-07"
      },
      {
        "label": "City & County of Broomfield — Rebates and Incentives",
        "cite": "NOT FOUND for a water or turf rebate. The page lists energy programs only (heat pumps, heat pump water heaters, insulation and air sealing, whole-home efficiency). Broomfield participates in Resource Central's lawn replacement program but publishes no municipal per-square-foot turf rate.",
        "url": "https://www.broomfield.org/4430/Rebates-and-Incentives",
        "checked": "2026-09-07"
      },
      {
        "label": "City of Boulder — water conservation",
        "cite": "No municipal per-square-foot turf rebate; turf removal is delivered through Resource Central, \"up to $750 in discounts towards your landscape conversion while supplies last\" for replacing at least 200 sq ft. Boulder manages irrigation demand through annual water budgets: \"The city uses water budgets for determining how much water each user account is allotted per year for irrigation.\"",
        "url": "https://bouldercolorado.gov/services/water-conservation",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado Water Conservation Board — Turf Replacement Program",
        "cite": "\"Update: As of March 2025, CWCB is no longer accepting applications for the Turf Replacement Grant Program.\" Statute (HB22-1151, C.R.S. 37-60-135): applicants \"SHALL NOT USE THE MONEY TO REPLACE TURF WITH ANY OF THE FOLLOWING: (A) IMPERMEABLE CONCRETE; (B) ARTIFICIAL TURF; (C) WATER FEATURES SUCH AS FOUNTAINS; (D) INVASIVE PLANT SPECIES; OR (E) TURF.\" CWCB lists \"Single Family Homeowners\" and \"Homeowners' Associations or any Multifamily Property\" as INELIGIBLE ENTITIES.",
        "url": "https://cwcb.colorado.gov/turf-replacement-program",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado General Assembly — SB24-005 (official bill summary)",
        "cite": "\"On and after January 1, 2026, the act prohibits local governments from allowing the installation, planting, or placement of nonfunctional turf, artificial turf, or invasive plant species on commercial, institutional, or industrial property, common interest community property, or a street right-of-way, parking lot, median, or transportation corridor.\" \"Artificial turf on athletic fields of play is exempted from the prohibitions.\" Effective 7 August 2024.",
        "url": "https://leg.colorado.gov/bills/sb24-005",
        "checked": "2026-09-07"
      },
      {
        "label": "Colorado General Assembly — HB25-1113, signed enrolled act",
        "cite": "SECTION 3 amends C.R.S. 37-99-103(1) to read \"a local entity shall not install, plant, or place, or allow any person to install, plant, or place, any nonfunctional turf, NONFUNCTIONAL artificial turf, or invasive plant species\" — the word NONFUNCTIONAL is new material inserted before \"artificial turf,\" narrowing the SB24-005 prohibition and creating a statutory category of functional artificial turf at C.R.S. 37-99-102(6.5).",
        "url": "https://content.leg.colorado.gov/sites/default/files/2025a_1113_signed.pdf",
        "checked": "2026-09-07"
      }
    ],
    "publicReferences": [
      "https://www.thorntonwater.com/wp-content/uploads/2026/02/2026-residential_artificial_turf_info__rules-1.pdf",
      "https://www.denverwater.org/tap/ditching-useless-turf-coloradoscape-we-can-help",
      "https://www.auroragov.org/UserFiles/Servers/Server_1881137/File/Residents/Water/Water%20Conservation/Landscape%20rebate/GRIP_Residential_Manual_2026_web_accessible.pdf",
      "https://crconserve.com/153/Rebates",
      "https://www.centennialwater.org/turf-replacement-program",
      "https://www.erieco.gov/1962/2026-Turf-Replacement-Rebate-Program"
    ]
  },
];

export const guideBySlug = (s: string) => GUIDES.find((g) => g.slug === s);
