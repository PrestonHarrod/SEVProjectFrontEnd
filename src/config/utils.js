/**
 * Set localStorage
 */

export default {
    
    setStore(name, content) {
        if (!name) return
        if (typeof content !== 'string') {
          content = JSON.stringify(content)
        }
        return window.localStorage.setItem(name, content)
      },
      /**
        * Get localStorage
      */
      getStore(name) {
        if (!name) return
        return JSON.parse(window.localStorage.getItem(name))
      },
      /**
       * Clear localStorage
      */
      removeItem(name) {
        if (!name) return
        return window.localStorage.removeItem(name)
      },
      /**
       * Validate Email address
       */
      isValidEmail(value) {
        return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value) ? false : true
      }
}
 