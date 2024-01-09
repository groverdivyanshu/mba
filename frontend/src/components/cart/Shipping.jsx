import React from "react";
import { Country, State } from "country-state-city";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart); // use shippingInfo from  state.cart
    // hear i want to show shippingInfo  in  form so, i use it under the useState which already store in localStorage.getItem . understand the flow --> first line 34-44 i localStorage.setItem( "shippingInfo",    then it send in in cartReducer next, call this info via  state.cart  and use it in form . if 2nd time any need to update data of form then only that part updated and fetch again . mean it use if any user fill its shippingInfo and he already buy hear then 2nd time no need to fill the form 
  const [hNo, setHNo] = useState(shippingInfo.hNo);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "addShippingInfo",
      payload: {
        hNo,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      },
    });

    localStorage.setItem( 
      "shippingInfo",
      JSON.stringify({  // hear 1st convert all data in string  then pass those data which you  want to store in local  Storage
        hNo,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );

    navigate("/confirmorder"); // hear i want to redirect page to /confirmorder page mean if click order place button on this page then go to redirect this  /confirmorder page . this navigate come from 18 & 5 . navigate work as a to navigate or redirect page 
  };

  return (
    <section className="shipping">
      <main>
        <h1>Shipping Details</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label>H.No.</label>
            <input
              type="text"
              placeholder="Enter House No."
              value={hNo}
              required
              onChange={(e) => setHNo(e.target.value)}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label>Country</label>

            <select
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            >
              {/* for select country*/}
              <option value="">Country</option>
              {/*   {Country --> hear  i want to country name so use  from "country-state-city" .  Then i want to search  all country name  so add  --->  Country.getAllCountries() . This(getAllCountries) is default using this i access all country than add .map fun , in map fun i use 1st bracket =>() for this reason do not need add return if  i add 2nd bracket {}  then must add return. After this go to this line  <option value={i.isoCode} key={i.isoCode}> hear in value i add {i.isoCode} this i in build in   "country-state-city"  package . every country {isoCode} will be different so add it in key. Now print Country name on  option so add this {i.name} */}
              {Country &&
                Country.getAllCountries().map((i) => (
                  <option value={i.isoCode} key={i.isoCode}>
                    {i.name}
                  </option>
                ))}

            </select>

          </div>
         {/* if value present in country mean if select country name only then show /active  the state option so to do this step i add  whole state option under this code -->   {country && ( ) } */}
          {country && (
            <div>
              <label>State</label>
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {/* same thing work in hear search state   */}
                {/* so add state in first then add && next , add State.getStatesOfCountry this is in build in   "country-state-city" package to search state. next same matter happened what i say in country  */}
                {State &&
                // but hear in state add it  ↓↓↓  country because search state as par country 
                  State.getStatesOfCountry(country).map((i) => (
                    <option value={i.isoCode} key={i.isoCode}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label>Pin Code</label>
            <input
              type="number"
              placeholder="Enter Pincode"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div>
            <label>Phone No.</label>
            <input
              type="number"
              placeholder="Enter Phone No."
              value={phoneNo}
              required
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <button type="submit">Confirm Order</button>
        </form>
      </main>
    </section>
  );
};

export default Shipping;
