<!-- src/Login.svelte -->
<script>
    import { signIn } from "../apis/userApis.js";
    import { navigate } from 'svelte-routing';
    import { user } from '../user.js';
    import RubuPlusLogo from '../assets/rubuplus-logo.svg'
    import plus from '../assets/plus.svg'
    import leftImage from '../assets/phone-mockup.png'
    import userLogo from '../assets/user.svg'
    import smartLock from '../assets/smart-lock.svg'
    import eye from '../assets/eye.svg'

    var email = "";
    var password = "";
    let rememberMe = false;
    let isInvalid = false;

    // check if checkbox is checked
    function checkbox() {
      rememberMe = !rememberMe;
      console.log(rememberMe);
    }
  
    async function handleLogin(event) {
      event.preventDefault();
      try {
        const userData = await signIn(email, password, rememberMe);
        user.set(userData);
        const accessToken = userData.accessToken;
        localStorage.setItem("accessToken", accessToken);
        if (userData.role.includes("ROLE_ADMIN")) {
            navigate('/dashboard');
        } else {
            navigate('/dashboard');
        }
      } catch (error) {
        isInvalid = true;
        console.log(email, password);
        console.log("error");
      }
    }

    let show_password = true
    $: type = show_password ? 'password' : 'text'
    let value = password

    function onInput (event) {
      password = event.target.value
    }
    
    $: validationClass = "";
    $: validationAlert = "d-none";
    $: if (isInvalid && email !== "" && password !== "") {
      validationClass = "invalid";
      validationAlert = "d-block invalid-feedback mb-3";
    } else {
      isInvalid = false;
      validationClass = "";
      validationAlert = "d-none";
    }
</script>

<style>
  .login-container {
      display: flex;
      min-height: 100vh;
  }
  .login-left {
    /* set background image */
      background-image: url("../assets/left_background.png");
      background-repeat: no-repeat;
      background-size: cover;
      color: white;
      flex: 1;
      display: flex;
      justify-content: center;
  }
  .login-right {
      flex: 2;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  #emailInputGroup, #passwordInputGroup {
    border-radius: 0.25rem;
    border: solid 1px #25324B14;
  }
  #inputEmail, #inputPassword {
    border: none;
    display: flex;
    align-items: center;
    height: 50px;
  }
  #inputEmail::placeholder, #inputPassword::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: #25324B !important;
  }
  .form-control:focus {
    box-shadow: none;
    font-weight: 400;
    color: #25324B !important;
  }
  #emailAddon, #passwordAddon {
    border-right: none;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
  }
  #passwordSecondAddon {
    border-left: none;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
  }
  #rememberMe {
    margin-right: 0.25rem;
    border-radius: 2px !important;
    border: 1px solid rgba(37, 50, 75, 0.05) !important;
    background: #F6F6F6;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  #rememberMe {
    accent-color: #25324b;
    border-radius: 2px;
    border: 1px solid rgba(37, 50, 75, 0.05);
    background: #F6F6F6;
  }
  .input-group-addon {
    background-color: white;
  }
  .invalid {
    border: 1px solid red !important;
    background-color: #FDE8E8 !important;
    margin-bottom: 0 !important;
  }
  .invalid:focus,
  .invalid > span,
  .invalid > div,
  .invalid > input,
  .invalid > input:-webkit-autofill {
    background-color: transparent !important;
  }
  .invalid > span > img, .invalid > div > button > img {
    filter: invert(1);
  }
</style>

<div class="login-container">
  <div class="login-left">
    <div class="col left-side d-flex flex-column justify-content-between">
      <div class="image-container w-100" style="padding: 4.75rem;">
        <img src="{ RubuPlusLogo }" alt="Logo" class="mb-5"><br>
        <div class="mt-4">
          <span class="text text-uppercase" style="font-size: 39px; font-weight: 300; font-family: 'Gilroy-Regular'; line-height: 52px; margin-bottom: 6rem">Kişiselleştirilmiş</span><br>
          <span class="text text-uppercase" style="font-size: 47px; font-weight: 900; font-family: 'Gilroy-Bold'; line-height: 42px">Video Mesaj (pvm) Platformu</span><br>
        </div>
      </div>
      <div class="image-container w-100">
        <img src="{ leftImage }" alt="Logo" class="img-fluid w-100">
      </div>
    </div>
  </div>
  <div class="login-middle d-flex justify-content-center align-items-middle bg-light" style="height: 100vh;">
    <div class="w-100 d-flex justify-content-end">
      <img src="{ plus }" alt="Logo" width="64" style="margin-left: -32px; z-index: 1;">
    </div>
  </div>
  <div class="login-right bg-light">
      <div style="width: 420px;">
          <div class="mb-2">
            <span style="font-weight: 800; font-size: 32px; color: #25324B; font-family: 'Gilroy-Bold', sans-serif;">Üye Girişi </span>
            <span style="font-weight: 400; font-size: 32px; color: #25324B">Yapın</span>
          </div>
          <p style="font-weight: 400; color: #a3a3a3; font-size: 14px; font-family: 'Gilroy-Light', sans-serif !important">Sisteme giriş için kullanıcı adınızı veya e-posta adresinizi giriniz.</p>
          <form>
              <div class="input-group mb-3 { validationClass }" id="emailInputGroup">
                <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                  <img src="{ userLogo }" alt="User Logo" width="24" />
                </span>
                <input type="email" class="form-control" style="font-size: 14px;" id="inputEmail" aria-describedby="emailHelp" placeholder="E-Posta Adresi Giriniz" bind:value={email} required/>
                
              </div>
              <div class="{ validationAlert }">
                Lütfen geçerli bir e-posta adresi giriniz.
              </div>
              <div class="input-group mb-3 { validationClass }" id="passwordInputGroup">
                <span class="input-group-addon bg-white align-items-center d-flex" id="passwordAddon">
                  <img src="{ smartLock }" alt="User Logo" width="24" />
                </span>
                <input { type } { value } on:input={ onInput } class="form-control " id="inputPassword" placeholder="Şifre Giriniz" required/>
                
                <div class="input-group-addon align-items-center d-flex" id="passwordSecondAddon">
                  <button type="button" on:click="{ () => show_password = !show_password }" style="border: 0; background:none;">
                    {#if show_password}
                      <img src="{ eye }" alt="User Logo" width="16" />
                    {:else}
                      <img src="{ eye }" alt="User Logo" width="16" />
                    {/if}
                  </button>
                </div>
              </div>
              <div class="{ validationAlert }">
                Lütfen geçerli bir şifre giriniz.
              </div>
              <div class="d-flex justify-content-between align-items-middle mb-3">
                <span class="d-flex align-items-center">
                  <input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe" bind:checked={rememberMe} on:click={checkbox}>
                  <label for="rememberMe" style="font-size: 14px; color: #25324B; font-weight: 500;">Beni Hatırla</label>
                </span>
                <span>
                  <a href="#" style="font-size: 14px; color: #04A3DA; font-weight: 400; text-decoration: none;">Şifremi Unuttum</a>
                </span>
              </div>
              <button type="submit" class="btn btn-primary w-100 border-0" style="height: 60px; background-color: #04A3DA; font-weight: 600;" on:click={handleLogin}>Giriş Yap</button>
          </form>
      </div>
  </div>
</div>